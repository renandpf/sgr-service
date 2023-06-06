import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { Produto } from "src/gerencial/core/domain/Produto";
import { CategoriaEnum } from "src/gerencial/core/domain/CategoriaEnum";

export class ObterProdutoUseCase {
    constructor( @Inject() private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    public async obterPorId(id: number): Promise<Produto> {
        return this.produtoRepositoryGateway.obterPorId(id);
    }

    public async obterPorCategoria(categoria:  CategoriaEnum): Promise<Produto[]> {
        return this.produtoRepositoryGateway.obterPorCategoria(categoria);
    }

}