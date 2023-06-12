import { Inject, Service } from "@tsed/di";
import { IProdutoRepositoryGateway } from "../../../core/application/ports";
import { Produto, CategoriaEnum } from "../../../core/domain";
import { Optional } from "typescript-optional";
import { ErrorToAccessDatabaseException } from "../../exception/ErrorToAccessDatabaseException";
import { PRODUTO_DATABASE_REPOSITORY } from "../../../../config/database/repository/repository-register.provider";

import { Logger } from "@tsed/common";
import { Equal } from "typeorm";
import { ProdutoEntity } from "src/common";

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

    async obterPorId(id: number): Promise<Optional<Produto>> {
        try {
            this.logger.trace("Start id={}", id)
            const produtoEntity = await this.produtoRepository.findOneBy({id: Equal(id)});


            let produtoOp: Optional<Produto> = Optional.empty();
            if(produtoEntity !== null){
                produtoOp = Optional.of(produtoEntity.getDomain());
            }

            this.logger.trace("End produtoOp={}", produtoOp)
            return produtoOp;

        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
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
    async criar(produto: Produto): Promise<number> {
        try {
            this.logger.trace("Start produto={}", produto)
            const produtoSavedEntities = await this.produtoRepository.save(new ProdutoEntity(produto));
            const idProdutoCreated = produtoSavedEntities.id;
            this.logger.trace("End idProdutoCreated={}", idProdutoCreated)
            return idProdutoCreated;

        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }

    }
    alterar(produto: Produto): Promise<void> {
        throw new Error("Method not implemented.");
    }

}