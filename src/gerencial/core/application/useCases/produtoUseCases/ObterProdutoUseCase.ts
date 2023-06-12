import { Inject, Service } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { Produto, CategoriaEnum } from "../../../domain";
import { ProdutoNotFoundException } from "../../exception/ProdutoNotFoundException";
import { Optional } from "typescript-optional";
import { ProdutoMySqlRepositoryGateway } from "../../../../adapter";
import { Logger } from "@tsed/common";

@Service()
export class ObterProdutoUseCase {

    @Inject()
    logger: Logger;


    constructor( @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

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