export interface IConfirmarPagamentoUseCase {
    confirmar(identificadorPagamento: string, statusPagamento: string): Promise<void>;
}