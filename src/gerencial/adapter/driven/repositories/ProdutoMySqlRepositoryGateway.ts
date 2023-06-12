import { Inject, Service } from "@tsed/di";
import { IProdutoRepositoryGateway } from "../../../core/application/ports";
import { Produto, CategoriaEnum } from "../../../core/domain";
import { Optional } from "typescript-optional";
import { MYSQL_DATA_SOURCE } from "../../../../config/database/MysqlDataSource";
import { DataSource, Equal, In } from "typeorm";
import { ProdutoEntity } from "../../../../common";
import { ErrorToAccessDatabaseException } from "../../exception/ErrorToAccessDatabaseException";
import { PRODUTO_DATABASE_REPOSITORY } from "../../../../config/database/repository/repository-register.provider";
import { equal } from "assert";
import { Logger } from "@tsed/common";

@Service()
export class ProdutoMySqlRepositoryGateway implements IProdutoRepositoryGateway {

    @Inject()
    logger: Logger;

    @Inject(PRODUTO_DATABASE_REPOSITORY)
    protected produtoRepository: PRODUTO_DATABASE_REPOSITORY;

    async excluir(id: number): Promise<void> {
        try {
            this.logger.trace("Start id={}", id)

            await this.produtoRepository.delete(id);
            this.logger.trace("End")
        }
        catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    obterPorId(id: number): Promise<Optional<Produto>> {
        //this.mysqlDataSource.manager.findBy({id: In([id])});

        throw new Error("Method not implemented.");
    }
    async obterPorCategoria(categoria: CategoriaEnum): Promise<Produto[]> {
        try {
            this.logger.trace("Start categoria={}", categoria)
            const position = (CategoriaEnum as never)[categoria] + 1;
            const produtosEntities = await this.produtoRepository.findBy({categoriaId: Equal(position)});
            const produtos = produtosEntities.map(pe => pe.getDomain());

            this.logger.trace("End produtos={}", produtos)
            return produtos;

        } catch (e) {
            this.logger.error(e);
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