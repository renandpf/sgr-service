import { Inject, Service } from "@tsed/di";

import { Logger } from "@tsed/common";

import { IPedidoRepositoryGateway } from "src/pedido/core/application/ports/IPedidoRepositoryGateway";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { ErrorToAccessDatabaseException } from "src/common/exception/ErrorToAccessDatabaseException";
import { Optional } from "typescript-optional";
import { PEDIDO_DATABASE_REPOSITORY } from "src/config/database/repository/repository-register.provider";
import { PedidoEntity } from "./entities";
import { Equal } from "typeorm";

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

    async alterar(pedido: Pedido): Promise<void> {
        try {
            this.logger.trace("Start pedido={}", pedido);
            const pedidoId = pedido.id as number;
            await this.pedidoRepository.update(pedidoId, { statusId: pedido.getStatus() });
            this.logger.trace("End pedidoUpdatedId={}", pedido.id);
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
}