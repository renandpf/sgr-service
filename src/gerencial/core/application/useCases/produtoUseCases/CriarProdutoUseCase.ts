import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { Produto } from "../../../domain";


export class CriarProdutoUseCase {
    constructor( @Inject() private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    public async criar(produto: Produto): Promise<number> {
        return this.produtoRepositoryGateway.criar(produto);
    }
}