import { Inject, Service } from "@tsed/di";
import { IProdutoRepositoryGateway } from "../../../core/application/ports";
import { Produto, CategoriaEnum } from "../../../core/domain";
import { Optional } from "typescript-optional";
import { MYSQL_DATA_SOURCE } from "../../../../config/database/MysqlDataSource";
import { DataSource, In } from "typeorm";
import { ProdutoEntity } from "../../../../common";
import { ErrorToAccessDatabaseException } from "../../exception/ErrorToAccessDatabaseException";

@Service()
export class ProdutoMySqlRepositoryGateway implements IProdutoRepositoryGateway {

    @Inject(MYSQL_DATA_SOURCE)
    protected mysqlDataSource: DataSource;

    excluir(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    obterPorId(id: number): Promise<Optional<Produto>> {
        //this.mysqlDataSource.manager.findBy({id: In([id])});

        throw new Error("Method not implemented.");
    }
    async obterPorCategoria(categoria: CategoriaEnum): Promise<Produto[]> {
        try {
            const produtosEntities = await this.mysqlDataSource.manager.find(ProdutoEntity);//FIXME: filtrar pela categoria
            return produtosEntities.map(pe => pe.getDomain());
        } catch(e){
            //TODO: logar
            throw new ErrorToAccessDatabaseException();
        }
    }
    criar(produto: Produto): Promise<number> {
        throw new Error("Method not implemented.");
    }
    alterar(produto: Produto): Promise<void> {
        throw new Error("Method not implemented.");
    }

}