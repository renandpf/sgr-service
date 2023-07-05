import { Optional } from "typescript-optional";
import { Produto } from "../../../../gerencial/core/domain/Produto";

export const IProdutoServiceGateway: unique symbol = Symbol("IProdutoServiceGateway");

export interface IProdutoServiceGateway {
    obterPorId(produtoId: number): Promise<Optional<Produto>>;
}