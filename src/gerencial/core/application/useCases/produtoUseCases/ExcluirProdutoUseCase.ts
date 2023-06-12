import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { ProdutoMySqlRepositoryGateway } from "../../../../adapter";
import { Logger } from "@tsed/common";

export class ExcluirProdutoUseCase {
    constructor(@Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway) { }

    @Inject()
    logger: Logger;

    public async excluir(id: number): Promise<void> {
        this.logger.trace("Start id={}", id);
        //TODO: adicionar a regra: caso o produto esteja associado a pelo menos 1 pedido, não deve ser excluído.
        await this.produtoRepositoryGateway.excluir(id);
        this.logger.trace("End");
    }
}