import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports/IProdutoRepositoryGateway";
import { ProdutoMySqlRepositoryGateway } from "../../../../adapter/driven/repositories/ProdutoMySqlRepositoryGateway";
import { Logger } from "@tsed/common";
import { ExclusaoProdutoAssociadoPedidoException } from "../../exception/ExclusaoProdutoAssociadoPedidoException";
import { IExcluirProdutoUseCase } from "./IExcluirProdutoUseCase";

export class ExcluirProdutoUseCase implements IExcluirProdutoUseCase {
    constructor(
        @Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway,
        @Inject() private logger: Logger,
    ) { }


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