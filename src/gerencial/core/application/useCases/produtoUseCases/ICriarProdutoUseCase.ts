import { Produto } from "../../../domain";

export const ICriarProdutoUseCase: unique symbol = Symbol("ICriarProdutoUseCase");

export interface ICriarProdutoUseCase {
    criar(produtoReq: Produto): Promise<number | undefined>;
}