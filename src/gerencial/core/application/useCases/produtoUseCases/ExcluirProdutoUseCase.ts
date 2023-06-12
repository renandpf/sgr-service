import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { ProdutoMySqlRepositoryGateway } from "../../../../adapter";
import { Logger } from "@tsed/common";
import { ExclusaoProdutoAssociadoPedidoException } from "../../exception/ExclusaoProdutoAssociadoPedidoException";

export class ExcluirProdutoUseCase {
    constructor(@Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway) { }

    @Inject()
    logger: Logger;

    public async excluir(id: number): Promise<void> {
        this.logger.trace("Start id={}", id);
        const existePedido = await this.produtoRepositoryGateway.existePedidoByProdutoId(id);
        if(existePedido){
            this.logger.warn("Product is associated with at least 1 order");
            throw new ExclusaoProdutoAssociadoPedidoException();
        }
        await this.produtoRepositoryGateway.excluir(id);
        this.logger.trace("End");
    }
}