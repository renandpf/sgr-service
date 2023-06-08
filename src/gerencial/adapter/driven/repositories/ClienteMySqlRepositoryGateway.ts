import { IClienteRepositoryGateway } from "../../../core/application/ports";
import { Cliente } from "../../../core/domain";
import { Service } from "@tsed/common";
import { Inject } from "@tsed/di";
import { MYSQL_DATA_SOURCE } from "../../../../config/database/MysqlDataSource";
import { DataSource, In } from "typeorm";
import { Optional } from "typescript-optional";

@Service()
export class ClienteMySqlRepositoryGateway implements IClienteRepositoryGateway{

    @Inject(MYSQL_DATA_SOURCE)
    protected mysqlDataSource: DataSource;

    async alterar(cliente: Cliente): Promise<Cliente> {
        return this.mysqlDataSource.manager.save(Cliente, cliente);
    }

    async criar(cliente: Cliente): Promise<Cliente> {
        return this.mysqlDataSource.manager.create(Cliente, cliente);
    }

    async obterPorCpf(cpf: string): Promise<Optional<Cliente>> {
        const cliente = await this.mysqlDataSource.manager.findOneBy(Cliente,
            {
                cpf: In([cpf])
            });
        return Optional.ofNullable(cliente);
    }

    async obterPorEmail(email: string): Promise<Optional<Cliente>> {
        const cliente = await this.mysqlDataSource.manager.findOneBy(Cliente,
            {
                email: In([email])
            });
        return Optional.ofNullable(cliente);
    }

    async obterPorId(id: number): Promise<Optional<Cliente>> {
        const cliente = await this.mysqlDataSource.manager.findOneBy(Cliente,
            {
                id: In([id])
            });
        return Optional.ofNullable(cliente);
    }

}