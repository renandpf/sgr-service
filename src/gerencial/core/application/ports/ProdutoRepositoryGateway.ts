import { Categoria } from "../../domain/Categoria";
import { Produto } from "../../domain/Produto";

export interface IProdutoRepositoryGateway {
    obterById(id: number): Promise<Produto>;
    obterByCategoria(categoria: Categoria): Promise<Produto[]>;
    criar(produto: Produto): Promise<number>;
    alterar(produto: Produto): Promise<void>;
}