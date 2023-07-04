import { Produto, CategoriaEnum } from "../../../domain";

export const IObterProdutoUseCase: unique symbol = Symbol("IObterProdutoUseCase");

export interface IObterProdutoUseCase {
    obterPorId(id: number): Promise<Produto>;
    obterPorCategoria(categoria:  CategoriaEnum): Promise<Produto[]>
}