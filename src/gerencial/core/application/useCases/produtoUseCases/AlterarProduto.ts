import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/ProdutoRepositoryGateway";
import { Produto } from "../../../domain/Produto";
import { Categoria } from "../../../domain/Categoria";


export class AlterarProdutoUseCase {
    constructor( @Inject() private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    public async alterar(produto: Produto): Promise<void> {
        this.produtoRepositoryGateway.alterar(produto);
    }
}