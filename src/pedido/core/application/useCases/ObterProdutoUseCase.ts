import { Service, Logger, Inject } from "@tsed/common";

import { ProdutoMySqlRepositoryGateway } from "src/pedido/adapter/driven/repositories/ProdutoMySqlRepositoryGateway";
import { IProdutoRepositoryGateway } from "src/gerencial/core/application/ports/IProdutoRepositoryGateway";
import { Produto } from "src/gerencial/core/domain/Produto";
import { Optional } from "typescript-optional";
import { ProdutoNotFoundException } from "../exceptions/ProdutoNotFoundException";

@Service()
export class ObterProdutoUseCase {
    
    constructor(
        @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger){}

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
}