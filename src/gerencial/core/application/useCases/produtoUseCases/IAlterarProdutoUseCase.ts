import { Produto } from "../../../domain/Produto";

export interface IAlterarProdutoUseCase {
    alterar(produto: Produto): Promise<void>;
}