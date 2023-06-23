import { Pagamento } from "../../domain/Pagamento";

export interface IPagamentoRepositoryGateway {
    criar(pagamento: Pagamento): Promise<number | undefined>;
}