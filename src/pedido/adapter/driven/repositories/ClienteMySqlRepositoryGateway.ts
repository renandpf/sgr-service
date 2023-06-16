import { Logger, Service } from "@tsed/common";
import { Inject } from "@tsed/di";
import { In } from "typeorm";
import { Optional } from "typescript-optional";
import { CLIENTE_DATABASE_REPOSITORY } from "../../../../config/database/repository/repository-register.provider";
import { ErrorToAccessDatabaseException } from "../../../../common/exception/ErrorToAccessDatabaseException";
import { IClienteRepositoryGateway } from "src/pedido/core/application/ports/IClienteRepositoryGateway";
import { Cliente } from "src/gerencial/core/domain/Cliente";


@Service()
export class ClienteMySqlRepositoryGateway implements IClienteRepositoryGateway {
    @Inject()
    logger: Logger;

    //@Inject(CLIENTE_DATABASE_REPOSITORY)//FIXME
    protected clienteRepository: CLIENTE_DATABASE_REPOSITORY;


    async obterPorId(id: number): Promise<Optional<Cliente>> {
        try {
            const clienteEntity = await this.clienteRepository.findOneBy(
                {
                    id: In([id])
                });
            return Optional.ofNullable(clienteEntity?.getDomain());
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }
}