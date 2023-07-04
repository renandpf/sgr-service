import { Optional } from "typescript-optional";
import { Pedido, StatusPedido } from "../../domain";

export const IPedidoRepositoryGateway: unique symbol = Symbol("IPedidoRepositoryGateway");

export interface IPedidoRepositoryGateway {
    criar(pedido: Pedido): Promise<number | undefined>;
    atualizarStatus(pedido: Pedido): Promise<void>;
    obterPorId(pedidoId: number): Promise<Optional<Pedido>>;
    obterEmAndamento(): Promise<Optional<Pedido[]>>;
    obterPorStatusAndIdentificadorPagamento(status: StatusPedido, identificadorPagamento: string): Promise<Pedido[]>;
    obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<Optional<Pedido>>;
}