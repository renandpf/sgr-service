import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { Produto } from "../../../domain";

export class AlterarProdutoUseCase {
    constructor( @Inject() private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    public async alterar(produto: Produto): Promise<void> {
        this.produtoRepositoryGateway.alterar(produto);
    }
}