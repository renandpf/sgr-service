export const IExcluirProdutoUseCase: unique symbol = Symbol("IExcluirProdutoUseCase");

export interface IExcluirProdutoUseCase {
    excluir(id: number): Promise<void>;
}