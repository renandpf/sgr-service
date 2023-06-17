import { Logger, Service } from "@tsed/common";
import { Inject } from "@tsed/di";
import { Optional } from "typescript-optional";
import { ErrorToAccessDatabaseException } from "../../../../common/exception/ErrorToAccessDatabaseException";
import { IClienteRepositoryGateway } from "src/pedido/core/application/ports/IClienteRepositoryGateway";
import { Cliente } from "src/gerencial/core/domain/Cliente";
import { ClienteController } from "src/gerencial";


@Service()
export class ClienteMySqlRepositoryGateway implements IClienteRepositoryGateway {
    @Inject()
    private logger: Logger;

    //@Inject(ClienteController)//FIXME
    private clienteController: ClienteController;

    async obterPorId(id: number): Promise<Optional<Cliente>> {
        try {
            const clienteJson =  await this.clienteController.obterPorId(id);
            return Optional.ofNullable(clienteJson.getDomain(clienteJson.id));
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }
}