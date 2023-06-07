import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { Produto } from "../../../domain";

export class ExcluirProdutoUseCase {
    constructor(@Inject() private produtoRepositoryGateway: IProdutoRepositoryGateway) { }

    public async excluir(produto: Produto): Promise<void> {
        //TODO: adicionar a regra: caso o produto esteja associado a pelo menos 1 pedido, não deve ser excluído.
        this.produtoRepositoryGateway.excluir(produto);
    }
}