import { Pagamento } from "../../domain/Pagamento";

export const IEfetuarPagamentoUseCase: unique symbol = Symbol("IEfetuarPagamentoUseCase");

export interface IEfetuarPagamentoUseCase {
    efetuar(pagamento: Pagamento): Promise<number | undefined>;
}