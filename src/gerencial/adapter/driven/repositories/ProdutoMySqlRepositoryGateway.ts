import { Inject, Service } from "@tsed/di";
import { IProdutoRepositoryGateway } from "../../../core/application/ports";
import { Produto, CategoriaEnum } from "../../../core/domain";
import { Optional } from "typescript-optional";
import { MYSQL_DATA_SOURCE } from "../../../../config/database/MysqlDataSource";
import { DataSource, In } from "typeorm";
import { ProdutoEntity } from "../../../../common";
import { ErrorToAccessDatabaseException } from "../../exception/ErrorToAccessDatabaseException";
import { PRODUTO_DATABASE_REPOSITORY } from "../../../../config/database/repository/repository-register.provider";

@Service()
export class ProdutoMySqlRepositoryGateway implements IProdutoRepositoryGateway {

    @Inject(PRODUTO_DATABASE_REPOSITORY)
    protected produtoRepository: PRODUTO_DATABASE_REPOSITORY;

    async excluir(id: number): Promise<void> {
        try {
            await this.produtoRepository.delete(id);
        }
        catch (e) {
            //TODO: logar
            throw new ErrorToAccessDatabaseException();
        }
    }

    obterPorId(id: number): Promise<Optional<Produto>> {
        //this.mysqlDataSource.manager.findBy({id: In([id])});

        throw new Error("Method not implemented.");
    }
    async obterPorCategoria(categoria: CategoriaEnum): Promise<Produto[]> {
        try {
            const produtosEntities = await this.produtoRepository.find();//FIXME: filtrar pela categoria
            return produtosEntities.map(pe => pe.getDomain());

        } catch (e) {
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