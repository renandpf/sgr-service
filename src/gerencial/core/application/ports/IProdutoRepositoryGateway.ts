import { Optional } from "typescript-optional";
import { CategoriaEnum, Produto } from "../../domain";
import { ProdutoDto } from "../../dto/produto/ProdutoDto";

export const IProdutoRepositoryGateway: unique symbol = Symbol("IProdutoRepositoryGateway");

export interface IProdutoRepositoryGateway {
    obterPorId(produtoId: number): Promise<Optional<Produto>>;
    obterPorCategoria(categoria: CategoriaEnum): Promise<Produto[]>;
    criar(produto: ProdutoDto): Promise<number>;
    alterar(produto: ProdutoDto): Promise<void>;
    excluir(produtoId: number): Promise<void>;
    existePedidoByProdutoId(produtoId: number): Promise<boolean>;
}