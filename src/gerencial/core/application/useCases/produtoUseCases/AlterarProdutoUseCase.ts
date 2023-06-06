import { Inject, Service } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { Produto } from "../../../domain";
import { ProdutoMySqlRepositoryGateway } from "src/gerencial/adapter/driven/repositories/ProdutoMySqlRepositoryGateway";

@Service()
export class AlterarProdutoUseCase {
    constructor( @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    public async alterar(produto: Produto): Promise<void> {
        this.produtoRepositoryGateway.alterar(produto);
    }
}