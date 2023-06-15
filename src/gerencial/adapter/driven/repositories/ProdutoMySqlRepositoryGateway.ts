import { Inject, Service } from "@tsed/di";
import { IProdutoRepositoryGateway } from "../../../core/application/ports";
import { Produto, CategoriaEnum } from "../../../core/domain";
import { Optional } from "typescript-optional";
import { ErrorToAccessDatabaseException } from "../../../../common/exception/ErrorToAccessDatabaseException";
import { PRODUTO_DATABASE_REPOSITORY } from "../../../../config/database/repository/repository-register.provider";

import { Logger } from "@tsed/common";
import { Equal } from "typeorm";
import { ProdutoEntity } from "./entity/ProdutoEntity";

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
    async criar(produto: Produto): Promise<number | undefined> {
        try {
            this.logger.trace("Start produto={}", produto)
            const produtoSavedEntity = await this.produtoRepository.save(new ProdutoEntity(produto));
            const idProdutoCreated = produtoSavedEntity.id;
            this.logger.trace("End idProdutoCreated={}", idProdutoCreated);
            return idProdutoCreated;

        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }

    }
    async alterar(produto: Produto): Promise<void> {
        try {
            this.logger.trace("Start produto={}", produto)
            await this.produtoRepository.save(new ProdutoEntity(produto));
            this.logger.trace("End");

        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }

    }

    async existePedidoByProdutoId(produtoId: number): Promise<boolean> {
        this.logger.trace("Start produtoId={}", produtoId)
        this.logger.warn("**** method not implemented! ****")
        const existsPedido = false;
        this.logger.trace("End existsPedido={}", existsPedido)
        return existsPedido;
    }
}