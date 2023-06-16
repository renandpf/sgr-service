import { Optional } from "typescript-optional";
import { Produto } from "src/gerencial/core/domain/Produto";

export interface IProdutoRepositoryGateway {
    obterPorId(produtoId: number): Promise<Optional<Produto>>;
}