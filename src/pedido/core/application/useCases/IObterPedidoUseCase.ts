import { Pedido } from "../../domain";

export const IObterPedidoUseCase: unique symbol = Symbol("IObterPedidoUseCase");

export interface IObterPedidoUseCase {
    obterPorId(id: number): Promise<Pedido>;
    obterEmAndamento(): Promise<Pedido[]>;
    obterPorStatusAndIdentificadorPagamento(status: string, identificadorPagamento: string): Promise<Pedido[]>;
    obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<Pedido>
}