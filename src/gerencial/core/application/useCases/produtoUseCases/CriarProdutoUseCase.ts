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

    public async criar(produtoReq: Produto): Promise<number | undefined> {
        this.logger.trace("Start produto={}", produtoReq);

        produtoReq.validar();

        const id = this.produtoRepositoryGateway.criar(produtoReq);
        this.logger.trace("End id={}", id);
        return id;
    }
}