import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/ProdutoRepositoryGateway";
import { Produto } from "src/gerencial/core/domain/Produto";

export class ObterProdutoUseCase {
    constructor( @Inject() private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    public async obterPorId(id: number): Promise<Produto> {
        return this.produtoRepositoryGateway.obterById(id);
    }

}