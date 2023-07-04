import { ProdutoDto } from "src/gerencial/core/dto/produto/ProdutoDto";

export const IObterProdutoUseCase: unique symbol = Symbol("IObterProdutoUseCase");

export interface IObterProdutoUseCase {
    obterPorId(id: number): Promise<ProdutoDto>;
    obterPorCategoria(categoria: string): Promise<ProdutoDto[]>
}