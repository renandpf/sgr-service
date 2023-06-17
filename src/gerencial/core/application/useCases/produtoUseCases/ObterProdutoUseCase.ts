import { Inject, Service } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { Produto, CategoriaEnum } from "../../../domain";
import { Optional } from "typescript-optional";
import { ProdutoMySqlRepositoryGateway } from "../../../../adapter/driven/repositories/ProdutoMySqlRepositoryGateway";
import { Logger } from "@tsed/common";
import { ProdutoNotFoundException } from "../../exception/ProdutoNotFoundException";

@Service()
export class ObterProdutoUseCase {

    constructor( 
        @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger
    ){}

    public async obterPorId(id: number): Promise<Produto> {
        this.logger.trace("Start id={}", id);

        const produtoFoundOp: Optional<Produto> = await this.produtoRepositoryGateway.obterPorId(id);
        if(produtoFoundOp.isEmpty()){
            this.logger.warn("Produto not found: {}", id);
            throw new ProdutoNotFoundException();
        }

        const produtoFound = produtoFoundOp.get();
        this.logger.trace("End produto={}", produtoFound);
        return produtoFound;
    }

    public async obterPorCategoria(categoria:  CategoriaEnum): Promise<Produto[]> {
        return this.produtoRepositoryGateway.obterPorCategoria(categoria);
    }
}