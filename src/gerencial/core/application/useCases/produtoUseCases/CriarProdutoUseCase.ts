import { Inject, Service } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { Produto } from "../../../domain";
import { ProdutoMySqlRepositoryGateway } from "../../../../adapter/driven/repositories/ProdutoMySqlRepositoryGateway";
import { Logger } from "@tsed/common";

@Service()
export class CriarProdutoUseCase {
    constructor( 
        @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger,
     ){}

    public async criar(produto: Produto): Promise<number | undefined> {
        //TODO: validar se id NÃO foi informado
        this.logger.trace("Start produto={}", produto);
        const id = this.produtoRepositoryGateway.criar(produto);
        this.logger.trace("End id={}", id);
        return id;
    }
}