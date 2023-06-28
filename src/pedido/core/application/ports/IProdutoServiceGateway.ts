import { Optional } from "typescript-optional";
import { Produto } from "../../../../gerencial/core/domain/Produto";

export interface IProdutoServiceGateway {
    obterPorId(produtoId: number): Promise<Optional<Produto>>;
}