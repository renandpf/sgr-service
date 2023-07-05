import { Inject, Logger } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { Optional } from "typescript-optional";
import { ProdutoNotFoundException } from "../../exception/ProdutoNotFoundException";
import { IObterProdutoUseCase } from "./IObterProdutoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { CategoriaEnumMapper } from "../../../../../gerencial/core/domain/CategoriaEnumMapper";
import { ProdutoDto } from "src/gerencial/core/dto/produto/ProdutoDto";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IObterProdutoUseCase
})
export class ObterProdutoUseCase implements IObterProdutoUseCase {

    constructor(
        @Inject(IProdutoRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger
    ) { }

    public async obterPorId(id: number): Promise<ProdutoDto> {
        this.logger.trace("Start id={}", id);

        const produtoFoundOp: Optional<ProdutoDto> = await this.produtoRepositoryGateway.obterPorId(id);
        if (produtoFoundOp.isEmpty()) {
            this.logger.warn("Produto not found: {}", id);
            throw new ProdutoNotFoundException();
        }

        const produtoFound = produtoFoundOp.get();
        this.logger.trace("End produto={}", produtoFound);
        return produtoFound;
    }

    public async obterPorCategoria(categoria: string): Promise<ProdutoDto[]> {
        this.logger.trace("Start categoria={}", categoria);
        const produtos = await this.produtoRepositoryGateway.obterPorCategoria(CategoriaEnumMapper.stringParaEnum(categoria.toUpperCase()));
        this.logger.trace("End produtos={}", produtos);
        return produtos;
    }
}