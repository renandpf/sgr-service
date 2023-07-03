import { Produto } from "../../../domain/Produto";

export interface ICriarProdutoUseCase {
    criar(produtoReq: Produto): Promise<number | undefined>;
}