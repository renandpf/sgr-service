export interface IExcluirProdutoUseCase {
    excluir(id: number): Promise<void>;
}