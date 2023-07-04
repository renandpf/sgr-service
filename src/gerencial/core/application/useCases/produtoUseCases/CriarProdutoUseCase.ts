import { Inject, Logger } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { Produto } from "../../../domain";
import { ICriarProdutoUseCase } from "./ICriarProdutoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: ICriarProdutoUseCase
})
export class CriarProdutoUseCase implements ICriarProdutoUseCase {
    constructor( 
        @Inject(IProdutoRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
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