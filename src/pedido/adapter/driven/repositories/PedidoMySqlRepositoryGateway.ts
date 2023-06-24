import { Inject, Service } from "@tsed/di";
import { Logger } from "@tsed/common";
import { IPedidoRepositoryGateway } from "src/pedido/core/application/ports/IPedidoRepositoryGateway";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { ErrorToAccessDatabaseException } from "src/common/exception/ErrorToAccessDatabaseException";
import { Optional } from "typescript-optional";
import { PEDIDO_DATABASE_REPOSITORY } from "src/config/database/repository/repository-register.provider";
import { PedidoEntity } from "./entities";
import { Equal } from "typeorm";
import { StatusPedido } from "../../../core/domain/StatusPedido";
import { StatusPedidoEnumMapper } from "../../../core/domain/StatusPedidoEnumMapper";

@Service()
export class PedidoMySqlRepositoryGateway implements IPedidoRepositoryGateway {

    @Inject()
    logger: Logger;

    @Inject(PEDIDO_DATABASE_REPOSITORY)
    protected pedidoRepository: PEDIDO_DATABASE_REPOSITORY;

    async criar(pedido: Pedido): Promise<number | undefined> {
        try {
            this.logger.trace("Start pedido={}", pedido);

            const pedidoEntityCreated = await this.pedidoRepository.save(new PedidoEntity(pedido));
            const pedidoCreatedId = pedidoEntityCreated.id;

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
            await this.pedidoRepository.update(pedidoId, { statusId: StatusPedidoEnumMapper.enumParaNumber(pedido.getStatus())});
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
            const pedidoEntity = await this.pedidoRepository.findOneBy(
                {
                    id: Equal(pedidoId)
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
                .where("ped.status in(:...status)", {
                    status:  [
                        StatusPedidoEnumMapper.enumParaNumber(StatusPedido.PREPARANDO)
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

    async obterPorStatus(status: StatusPedido): Promise<Optional<Pedido>> {
        try {
            this.logger.trace(`Consultando pedidos por status: ${status}`);
            const pedidos: Pedido[]= [];

            const pedidoEntity = await this.pedidoRepository
            .createQueryBuilder("ped")
            .where("ped.status = :status", {
                status: StatusPedidoEnumMapper.enumParaNumber(status)
            }).getMany();

            pedidoEntity.forEach(pe => {
                pedidos.push(pe.getDomain());
            })

            return Optional.of(pedidos);
        } catch (error) {
            this.logger.error(error);
            throw new ErrorToAccessDatabaseException();
        }
    }
}