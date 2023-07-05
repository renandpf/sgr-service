import { Inject, Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { Logger } from "@tsed/common";
import { IPedidoRepositoryGateway } from "../../../core/application";
import { StatusPedido, StatusPedidoEnumMapper } from "../../../core/domain";
import { ErrorToAccessDatabaseException } from "../../../../common/exception/ErrorToAccessDatabaseException";
import { Optional } from "typescript-optional";
import {
    ITEM_DATABASE_REPOSITORY,
    PAGAMENTO_DATABASE_REPOSITORY,
    PEDIDO_DATABASE_REPOSITORY
} from "../../../../config/database/repository/repository-register.provider";
import { PedidoEntity } from "./entities";
import { PedidoDto } from "../../../core/dtos/PedidoDto";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IPedidoRepositoryGateway
})
export class PedidoMySqlRepositoryGateway implements IPedidoRepositoryGateway {

    @Inject()
    logger: Logger;

    @Inject(PEDIDO_DATABASE_REPOSITORY)
    protected pedidoRepository: PEDIDO_DATABASE_REPOSITORY;

    @Inject(PAGAMENTO_DATABASE_REPOSITORY)
    protected pagamentoRepository: PAGAMENTO_DATABASE_REPOSITORY;

    @Inject(ITEM_DATABASE_REPOSITORY)
    protected pedidoItemRepository: ITEM_DATABASE_REPOSITORY;

    async criar(pedido: PedidoDto): Promise<number | undefined> {
        try {
            this.logger.trace("Start pedido={}", pedido);
            //TODO adicionar controle de transação
            const pedidoEntity = new PedidoEntity(pedido);
            const pedidoEntityCreated = await this.pedidoRepository.save(pedidoEntity);
            const pedidoCreatedId = pedidoEntityCreated.id;

            if (pedidoEntity.itens) {
                for (let i = 0; i < pedidoEntity.itens.length; i++) {
                    const item = pedidoEntity.itens[i];
                    item.pedido = pedidoEntityCreated;
                    await this.pedidoItemRepository.save(item);
                }
            }

            this.logger.trace("End pedidoCreatedId={}", pedidoCreatedId);
            return pedidoCreatedId;

        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }

    }

    async atualizarStatus(pedido: PedidoDto): Promise<void> {
        try {
            this.logger.trace("Start pedido={}", pedido);
            const pedidoId = pedido.id as number;
            await this.pedidoRepository.update(pedidoId, {
                statusId: StatusPedidoEnumMapper.enumParaNumber(pedido.status)
            });
            this.logger.trace("End");
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorId(pedidoId: number): Promise<Optional<PedidoDto>> {
        try {
            this.logger.trace("Start id={}", pedidoId);
            const pedidoEntity = await this.pedidoRepository
              .createQueryBuilder("ped")
              .where("ped.Id = :id", {
                  id: pedidoId
              })
              .leftJoinAndSelect('ped.cliente', 'cli')
              .leftJoinAndSelect('ped.itens', 'item')
              .leftJoinAndSelect('item.produto', 'prod')
              .leftJoinAndSelect('item.pedido', 'peditem')
              .getOne();
            return Optional.ofNullable(pedidoEntity?.getDto());
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterEmAndamento(): Promise<Optional<PedidoDto[]>> {
        try {
            this.logger.trace("Start em amdamento");
            const pedidos: PedidoDto[] = [];

            const pedidoEntity = await this.pedidoRepository
                .createQueryBuilder("ped")
                .where("ped.statusId in(:...status)", {
                    status: [
                        StatusPedidoEnumMapper.enumParaNumber(StatusPedido.PAGO),
                        StatusPedidoEnumMapper.enumParaNumber(StatusPedido.EM_PREPARACAO)
                    ]
                })
                .getMany();

            pedidoEntity.forEach(pe => {
                pedidos.push(pe.getDto());
            });

            return Optional.of(pedidos);
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<Optional<PedidoDto>> {
        try {
            this.logger.trace("Start identificadorPagamento={}", identificadorPagamento);

            const pagamento = await this.pagamentoRepository.findOneBy({
                codigoPagamento: identificadorPagamento                
            });

            let pedidoOp: Optional<PedidoDto> = Optional.empty();
            if(pagamento !== null && pagamento.pedido !== undefined){
                const pedidoEntity = pagamento.pedido;
                pedidoOp = Optional.of(pedidoEntity.getDto());
            }

            this.logger.trace("End pedidoOp={}", pedidoOp)
            return pedidoOp;
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorStatusAndIdentificadorPagamento(status: StatusPedido, identificadorPagamento: string): Promise<PedidoDto[]> {
        try {
            this.logger.trace("Start status={}, identificadorPagamento={}", status, identificadorPagamento);
            const pedidos: PedidoDto[] = [];
            
            //TODO: implementar filtro de "identificadorPagamento"

            const pedidoEntity = await this.pedidoRepository
                .createQueryBuilder("ped")
                .where("ped.statusId = :status", {
                    status: StatusPedidoEnumMapper.enumParaNumber(status)
                }).getMany();

            pedidoEntity.forEach(pe => {
                pedidos.push(pe.getDto());
            })


            this.logger.trace("End pedidos={}", pedidos);
            return pedidos;
        } catch (error) {
            this.logger.error(error);
            throw new ErrorToAccessDatabaseException();
        }
    }
}