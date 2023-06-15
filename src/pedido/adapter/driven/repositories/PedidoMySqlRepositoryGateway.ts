import { Inject, Service } from "@tsed/di";

import { Logger } from "@tsed/common";

import { IPedidoRepositoryGateway } from "src/pedido/core/application/ports/IPedidoRepositoryGateway";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { ErrorToAccessDatabaseException } from "src/common/exception/ErrorToAccessDatabaseException";

@Service()
export class PedidoMySqlRepositoryGateway implements IPedidoRepositoryGateway {
    @Inject()
    logger: Logger;
    
    criar(pedido: Pedido): Promise<number | undefined> {
        try{
            this.logger.trace("Start pedido={}", pedido);
            //TODO: Implementar
            return Promise.resolve(15);

        }        
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }

    }

}