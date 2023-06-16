import { IClienteRepositoryGateway } from "../../../core/application/ports";
import { Cliente } from "../../../core/domain";
import { Logger, Service } from "@tsed/common";
import { Inject } from "@tsed/di";
import { In } from "typeorm";
import { Optional } from "typescript-optional";
import { ClienteEntity } from "./entities";
import { CLIENTE_DATABASE_REPOSITORY } from "../../../../config/database/repository/repository-register.provider";
import { ErrorToAccessDatabaseException } from "../../../../common/exception/ErrorToAccessDatabaseException";


@Service()
export class ClienteMySqlRepositoryGateway implements IClienteRepositoryGateway{
    @Inject()
    logger: Logger;

    @Inject(CLIENTE_DATABASE_REPOSITORY)
    protected clienteRepository: CLIENTE_DATABASE_REPOSITORY;

    async alterar(cliente: Cliente): Promise<Cliente> {
        try {
            const clienteEntity = await this.clienteRepository.save(new ClienteEntity(cliente));
            return clienteEntity.getDomain();
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async criar(cliente: Cliente): Promise<Cliente> {
        try {
            const clienteEntity = await this.clienteRepository.save(new ClienteEntity(cliente));
            return clienteEntity.getDomain();
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorCpf(cpf: string): Promise<Optional<Cliente>> {
        try {
            const clienteEntity = await this.clienteRepository.findOneBy(
                {
                    cpf: In([cpf])
                });
            return Optional.ofNullable(clienteEntity?.getDomain());
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorEmail(email: string): Promise<Optional<Cliente>> {
        try {
            const clienteEntity = await this.clienteRepository.findOneBy(
                {
                    email: In([email])
                });
            return Optional.ofNullable(clienteEntity?.getDomain());
        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

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