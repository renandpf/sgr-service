import { Produto } from "../../domain/Produto";

export interface IProdutoRepositoryGateway {
    obterById(id: number): Promise<Produto>;
}