import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { ProdutoMySqlRepositoryGateway } from "../../../../adapter/driven/repositories/ProdutoMySqlRepositoryGateway";

export class ExcluirProdutoUseCase {
    constructor(@Inject(ProdutoMySqlRepositoryGateway) private produtoRepositoryGateway: IProdutoRepositoryGateway) { }

    public async excluir(id: number): Promise<void> {
        //TODO: adicionar a regra: caso o produto esteja associado a pelo menos 1 pedido, não deve ser excluído.
        this.produtoRepositoryGateway.excluir(id);
    }
}