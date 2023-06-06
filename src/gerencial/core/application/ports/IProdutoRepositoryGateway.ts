import { CategoriaEnum, Produto } from "../../domain";

export interface IProdutoRepositoryGateway {
    obterPorId(id: number): Promise<Produto>;
    obterPorCategoria(categoria: CategoriaEnum): Promise<Produto[]>;
    criar(produto: Produto): Promise<number>;
    alterar(produto: Produto): Promise<void>;
}