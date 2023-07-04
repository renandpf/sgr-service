import { Inject, Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { Logger } from "@tsed/common";
import { IPedidoRepositoryGateway } from "../../../core/application";
import { Pedido, StatusPedido, StatusPedidoEnumMapper } from "../../../core/domain";
import { ErrorToAccessDatabaseException } from "../../../../common/exception/ErrorToAccessDatabaseException";
import { Optional } from "typescript-optional";
import {
    ITEM_DATABASE_REPOSITORY,
    PAGAMENTO_DATABASE_REPOSITORY,
    PEDIDO_DATABASE_REPOSITORY
} from "../../../../config/database/repository/repository-register.provider";
import { PedidoEntity } from "./entities";

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

    async criar(pedido: Pedido): Promise<number | undefined> {
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

    async atualizarStatus(pedido: Pedido): Promise<void> {
        try {
            this.logger.trace("Start pedido={}", pedido);
            const pedidoId = pedido.id as number;
            await this.pedidoRepository.update(pedidoId, { statusId: StatusPedidoEnumMapper.enumParaNumber(pedido.status) });
            this.logger.trace("End");
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorId(pedidoId: number): Promise<Optional<Pedido>> {
        try {
            this.logger.trace("Start id={}", pedidoId);
            const pedidoEntity = await this.pedidoRepository.findOne({
                where: {
                    id: pedidoId
                },
                relations: {
                    cliente: true,
                    itens: true,
                },
            });
            return Optional.ofNullable(pedidoEntity?.getDomain());
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterEmAndamento(): Promise<Optional<Pedido[]>> {
        try {
            this.logger.trace("Start em amdamento");
            const pedidos: Pedido[] = [];

            const pedidoEntity = await this.pedidoRepository
                .createQueryBuilder("ped")
                .where("ped.statusId in(:...status)", {
                    status: [
                        StatusPedidoEnumMapper.enumParaNumber(StatusPedido.RECEBIDO),
                        StatusPedidoEnumMapper.enumParaNumber(StatusPedido.EM_PREPARACAO)
                    ]
                })
                .getMany();

            pedidoEntity.forEach(pe => {
                pedidos.push(pe.getDomain());
            });

            return Optional.of(pedidos);
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<Optional<Pedido>> {
        try {
            this.logger.trace("Start identificadorPagamento={}", identificadorPagamento);

            const pagamento = await this.pagamentoRepository.findOneBy({
                codigoPagamento: identificadorPagamento                
            });

            let pedidoOp: Optional<Pedido> = Optional.empty();
            if(pagamento !== null && pagamento.pedido !== undefined){
                const pedidoEntity = pagamento.pedido;
                pedidoOp = Optional.of(pedidoEntity.getDomain());
            }

            this.logger.trace("End pedidoOp={}", pedidoOp)
            return pedidoOp;
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorStatusAndIdentificadorPagamento(status: StatusPedido, identificadorPagamento: string): Promise<Pedido[]> {
        try {
            this.logger.trace("Start status={}, identificadorPagamento={}", status, identificadorPagamento);
            const pedidos: Pedido[] = [];
            
            //TODO: implementar filtro de "identificadorPagamento"

            const pedidoEntity = await this.pedidoRepository
                .createQueryBuilder("ped")
                .where("ped.statusId = :status", {
                    status: StatusPedidoEnumMapper.enumParaNumber(status)
                }).getMany();

            pedidoEntity.forEach(pe => {
                pedidos.push(pe.getDomain());
            })


            this.logger.trace("End pedidos={}", pedidos);
            return pedidos;
        } catch (error) {
            this.logger.error(error);
            throw new ErrorToAccessDatabaseException();
        }
    }
}