import { Inject, Service } from "@tsed/di";
import { IProdutoRepositoryGateway } from "../../../core/application/ports/IProdutoRepositoryGateway";
import { Produto, CategoriaEnum } from "../../../core/domain";
import { Optional } from "typescript-optional";
import {MYSQL_DATA_SOURCE} from "../../../../config/database/MysqlDataSource";
import { DataSource, In } from "typeorm";
import { ProdutoEntity } from "../../../../common/database/entity/ProdutoEntity";

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
        const produtosEntities = await this.mysqlDataSource.manager.find(ProdutoEntity);
        const produtos = produtosEntities.map(pe => pe.getDomain());

        return produtos;
    }
    criar(produto: Produto): Promise<number> {
        throw new Error("Method not implemented.");
    }
    alterar(produto: Produto): Promise<void> {
        throw new Error("Method not implemented.");
    }

}