import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/ProdutoRepositoryGateway";
import { Produto } from "../../../domain/Produto";


export class CriarProdutoUseCase {
    constructor( @Inject() private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    public async criar(produto: Produto): Promise<number> {
        return this.produtoRepositoryGateway.criar(produto);
    }
}