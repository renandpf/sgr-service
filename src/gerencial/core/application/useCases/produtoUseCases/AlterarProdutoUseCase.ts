import { Inject, Service } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { Produto } from "../../../domain";
import { ProdutoMySqlRepositoryGateway } from "../../../../adapter";
import { Logger } from "@tsed/common";

@Service()
export class AlterarProdutoUseCase {
    constructor( @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway ){}

    @Inject()
    logger: Logger;


    public async alterar(produto: Produto): Promise<void> {
        //TODO: validar se id foi informado
        this.logger.trace("Start produto={}", produto);
        await this.produtoRepositoryGateway.alterar(produto);
        this.logger.trace("End");
    }
}