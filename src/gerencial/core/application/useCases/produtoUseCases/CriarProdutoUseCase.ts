import { Inject, Service } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { Produto } from "../../../domain/Produto";
import { ProdutoMySqlRepositoryGateway } from "../../../../adapter/driven/repositories/ProdutoMySqlRepositoryGateway";
import { Logger } from "@tsed/common";
import { ICriarProdutoUseCase } from "./ICriarProdutoUseCase";

@Service()
export class CriarProdutoUseCase implements ICriarProdutoUseCase {
    constructor( 
        @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger,
     ){}

    public async criar(produtoReq: Produto): Promise<number | undefined> {
        this.logger.trace("Start produto={}", produtoReq);

        produtoReq.validar();

        const id = await this.produtoRepositoryGateway.criar(produtoReq);
        this.logger.trace("End id={}", id);
        return id;
    }
}