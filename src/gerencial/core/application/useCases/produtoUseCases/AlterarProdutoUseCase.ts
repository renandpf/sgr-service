import { Inject, Service } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { Produto } from "../../../domain/Produto";
import { ProdutoMySqlRepositoryGateway } from "../../../../adapter/driven/repositories/ProdutoMySqlRepositoryGateway";
import { Logger } from "@tsed/common";
import { IAlterarProdutoUseCase } from "./IAlterarProdutoUseCase";

@Service()
export class AlterarProdutoUseCase implements IAlterarProdutoUseCase {
    constructor( 
        @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger){}

    public async alterar(produto: Produto): Promise<void> {
        //TODO: validar se id foi informado
        this.logger.trace("Start produto={}", produto);
        await this.produtoRepositoryGateway.alterar(produto);
        this.logger.trace("End");
    }
}