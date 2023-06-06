import { Optional } from "typescript-optional";
import { CategoriaEnum, Produto } from "../../domain";

export interface IProdutoRepositoryGateway {
    obterPorId(id: number): Promise<Optional<Produto>>;
    obterPorCategoria(categoria: CategoriaEnum): Promise<Produto[]>;
    criar(produto: Produto): Promise<number>;
    alterar(produto: Produto): Promise<void>;
    excluir(produto: Produto): Promise<void>;
}