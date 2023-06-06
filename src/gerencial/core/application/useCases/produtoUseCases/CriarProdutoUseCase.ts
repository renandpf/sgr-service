import { Inject, Service } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { Produto } from "../../../domain";
import { ProdutoMySqlRepositoryGateway } from "src/gerencial/adapter/driven/repositories/ProdutoMySqlRepositoryGateway";

@Service()
export class CriarProdutoUseCase {
    constructor( @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    public async criar(produto: Produto): Promise<number> {
        return this.produtoRepositoryGateway.criar(produto);
    }
}