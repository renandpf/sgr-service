import { Optional } from "typescript-optional";
import { CategoriaEnum } from "../../domain";
import { ProdutoDto } from "../../dto/produto/ProdutoDto";

export const IProdutoRepositoryGateway: unique symbol = Symbol("IProdutoRepositoryGateway");

export interface IProdutoRepositoryGateway {
    obterPorId(produtoId: number): Promise<Optional<ProdutoDto>>;
    obterPorCategoria(categoria: CategoriaEnum): Promise<ProdutoDto[]>;
    criar(produto: ProdutoDto): Promise<number>;
    alterar(produto: ProdutoDto): Promise<void>;
    excluir(produtoId: number): Promise<void>;
}