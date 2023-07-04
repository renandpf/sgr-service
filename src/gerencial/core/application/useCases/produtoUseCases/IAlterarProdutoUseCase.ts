import { Produto } from "../../../domain/Produto";

export const IAlterarProdutoUseCase: unique symbol = Symbol("IAlterarProdutoUseCase");

export interface IAlterarProdutoUseCase {
    alterar(produto: Produto): Promise<void>;
}