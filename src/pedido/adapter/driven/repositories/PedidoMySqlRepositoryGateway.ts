import { Inject, Service } from "@tsed/di";

import { Logger } from "@tsed/common";

import { IPedidoRepositoryGateway } from "src/pedido/core/application/ports/IPedidoRepositoryGateway";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { ErrorToAccessDatabaseException } from "src/common/exception/ErrorToAccessDatabaseException";
import { Optional } from "typescript-optional";
import { PEDIDO_DATABASE_REPOSITORY } from "src/config/database/repository/repository-register.provider";
import { PedidoEntity } from "./entities";

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
            //TODO: Implementar
            Promise.resolve(15);
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorId(pedidoId: number): Promise<Optional<Pedido>> {
        try {
            this.logger.trace("Start id={}", pedidoId);
            const pedido: Optional<Pedido> = Optional.empty();
            //TODO: Implementar
            return Promise.resolve(pedido);
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }
}