import { Inject, Service } from "@tsed/di";

import { Logger } from "@tsed/common";
import { IPedidoRepositoryGateway } from "src/pagamento/core/application/ports/IPedidoRepositoryGateway";
import { PEDIDO_DATABASE_REPOSITORY } from "src/config/database/repository/repository-register.provider";
import { Optional } from "typescript-optional";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { ErrorToAccessDatabaseException } from "src/common/exception/ErrorToAccessDatabaseException";

@Service()
export class PedidoMySqlRepositoryGateway implements IPedidoRepositoryGateway {
    @Inject()
    logger: Logger;

    @Inject(PEDIDO_DATABASE_REPOSITORY)
    protected pedidoRepository: PEDIDO_DATABASE_REPOSITORY;


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