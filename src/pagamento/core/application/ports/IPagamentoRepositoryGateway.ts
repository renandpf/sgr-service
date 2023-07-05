import { PagamentoDto } from "../../dto/PagamentoDto";

export const IPagamentoRepositoryGateway: unique symbol = Symbol("IPagamentoRepositoryGateway");

export interface IPagamentoRepositoryGateway {
    criar(dto: PagamentoDto): Promise<number | undefined>;
}