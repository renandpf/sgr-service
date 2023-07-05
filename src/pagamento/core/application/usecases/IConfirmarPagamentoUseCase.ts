export const IConfirmarPagamentoUseCase: unique symbol = Symbol("IConfirmarPagamentoUseCase");

export interface IConfirmarPagamentoUseCase {
    confirmar(identificadorPagamento: string, statusPagamento: string): Promise<void>;
}