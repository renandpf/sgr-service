import { Inject, Logger } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { IExcluirProdutoUseCase } from "./IExcluirProdutoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IExcluirProdutoUseCase
})
export class ExcluirProdutoUseCase implements IExcluirProdutoUseCase {
    constructor(
        @Inject(IProdutoRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger,
    ) { }

    public async excluir(id: number): Promise<void> {
        this.logger.trace("Start id={}", id);
        await this.verificaSeProdutoEstaAssociadoItem(id);
        await this.produtoRepositoryGateway.excluir(id);
        this.logger.trace("End");
    }

    //TODO: este método deveria chamar o service de Pedido
    private async verificaSeProdutoEstaAssociadoItem(id: number) {
        this.logger.trace(id);
        // const existePedido = await this.produtoRepositoryGateway.existePedidoByProdutoId(id);
        // if (existePedido) {
        //     this.logger.warn("Product is associated with at least 1 order");
        //     throw new ExclusaoProdutoAssociadoPedidoException();
        // }
    }
}