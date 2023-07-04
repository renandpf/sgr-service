import { Inject, Logger } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { Produto } from "../../../domain/Produto";
import { IAlterarProdutoUseCase } from "./IAlterarProdutoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IAlterarProdutoUseCase
})
export class AlterarProdutoUseCase implements IAlterarProdutoUseCase {
    constructor( 
        @Inject(IProdutoRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger){}

    public async alterar(produto: Produto): Promise<void> {
        //TODO: validar se id foi informado
        this.logger.trace("Start produto={}", produto);
        await this.produtoRepositoryGateway.alterar(produto);
        this.logger.trace("End");
    }
}