import { Pagamento } from "../../domain/Pagamento";

export const IPagamentoRepositoryGateway: unique symbol = Symbol("IPagamentoRepositoryGateway");

export interface IPagamentoRepositoryGateway {
    criar(pagamento: Pagamento): Promise<number | undefined>;
}