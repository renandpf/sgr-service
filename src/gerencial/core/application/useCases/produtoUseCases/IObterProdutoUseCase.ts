import { Produto, CategoriaEnum } from "../../../domain";

export interface IObterProdutoUseCase {
    obterPorId(id: number): Promise<Produto>;
    obterPorCategoria(categoria:  CategoriaEnum): Promise<Produto[]>
}