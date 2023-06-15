import { Optional } from "typescript-optional";
import { CategoriaEnum, Produto } from "../../domain";

export interface IProdutoRepositoryGateway {
    obterPorId(produtoId: number): Promise<Optional<Produto>>;
    obterPorCategoria(categoria: CategoriaEnum): Promise<Produto[]>;
    criar(produto: Produto): Promise<number |  undefined>;
    alterar(produto: Produto): Promise<void>;
    excluir(produtoId: number): Promise<void>;
    existePedidoByProdutoId(produtoId: number): Promise<boolean>;
}