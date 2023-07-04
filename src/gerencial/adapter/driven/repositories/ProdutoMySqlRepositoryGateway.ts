import { Inject, Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { IProdutoRepositoryGateway } from "../../../core/application/ports";
import { CategoriaEnum } from "../../../core/domain";
import { Optional } from "typescript-optional";
import { ErrorToAccessDatabaseException } from "../../../../common/exception/ErrorToAccessDatabaseException";
import { PRODUTO_DATABASE_REPOSITORY } from "../../../../config/database/repository/repository-register.provider";
import { Logger } from "@tsed/common";
import { Equal } from "typeorm";
import { ProdutoEntity } from "./entities";
import { ProdutoDto } from "src/gerencial/core/dto/produto/ProdutoDto";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IProdutoRepositoryGateway
})
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

    async obterPorId(id: number): Promise<Optional<ProdutoDto>> {
        try {
            this.logger.trace("Start id={}", id)
            const produtoEntity = await this.produtoRepository.findOneBy({ id: Equal(id) });


            let produtoOp: Optional<ProdutoDto> = Optional.empty();
            if (produtoEntity !== null) {
                produtoOp = Optional.of(produtoEntity.getProdutoDto());
            }

            this.logger.trace("End produtoOp={}", produtoOp)
            return produtoOp;

        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }

    async obterPorCategoria(categoria: CategoriaEnum): Promise<ProdutoDto[]> {
        try {
            this.logger.trace("Start categoria={}", categoria)
            const produtosEntities = await this.produtoRepository.findBy({ categoriaId: Equal(categoria) });
            const produtos = produtosEntities.map(pe => pe.getProdutoDto());

            this.logger.trace("End produtos={}", produtos)
            return produtos;

        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }
    }
    async criar(dto: ProdutoDto): Promise<number> {
        try {
            this.logger.trace("Start dto={}", dto)
            const produtoSavedEntity = await this.produtoRepository.save(new ProdutoEntity(dto));
            const idProdutoCreated = produtoSavedEntity.id;
            this.logger.trace("End idProdutoCreated={}", idProdutoCreated);
            return idProdutoCreated as number;

        } catch (e) {
            this.logger.error(e);
            throw new ErrorToAccessDatabaseException();
        }

    }
    async alterar(produto: ProdutoDto): Promise<void> {
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