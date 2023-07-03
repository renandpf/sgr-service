import { Pagamento } from "../../domain/Pagamento";

export interface IEfetuarPagamentoUseCase {
    efetuar(pagamento: Pagamento): Promise<number | undefined>;
}