import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/ProdutoRepositoryGateway";
import { Produto } from "src/gerencial/core/domain/Produto";
import { Categoria } from "src/gerencial/core/domain/Categoria";

export class ObterProdutoUseCase {
    constructor( @Inject() private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    public async obterPorId(id: number): Promise<Produto> {
        return this.produtoRepositoryGateway.obterById(id);
    }

    public async obterPorCategoria(categoria:  Categoria): Promise<Produto[]> {
        return this.produtoRepositoryGateway.obterByCategoria(categoria);
    }

}