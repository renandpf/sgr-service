import { Inject, Service } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { Produto } from "src/gerencial/core/domain/Produto";
import { CategoriaEnum } from "src/gerencial/core/domain/CategoriaEnum";
import { ProdutoNotFoundException } from "../../exception/ProdutoNotFoundException";
import { Optional } from "typescript-optional";
import { ProdutoMySqlRepositoryGateway } from "src/gerencial/adapter/driven/repositories/ProdutoMySqlRepositoryGateway";

@Service()
export class ObterProdutoUseCase {
    constructor( @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    public async obterPorId(id: number): Promise<Produto> {

        const produtoFoundOp: Optional<Produto> = await this.produtoRepositoryGateway.obterPorId(id);
        if(produtoFoundOp.isEmpty()){
            throw new ProdutoNotFoundException();
        }

        return produtoFoundOp.get();
    }

    public async obterPorCategoria(categoria:  CategoriaEnum): Promise<Produto[]> {
        return this.produtoRepositoryGateway.obterPorCategoria(categoria);
    }
}