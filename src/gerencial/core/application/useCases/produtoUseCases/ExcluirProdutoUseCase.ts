import { Inject } from "@tsed/common";
import { IProdutoRepositoryGateway } from "../../ports";
import { Produto } from "../../../domain";

export class ExcluirProdutoUseCase {
    constructor(@Inject() private produtoRepositoryGateway: IProdutoRepositoryGateway) { }

    public async excluir(produto: Produto): Promise<void> {
        this.produtoRepositoryGateway.excluir(produto);
    }
}