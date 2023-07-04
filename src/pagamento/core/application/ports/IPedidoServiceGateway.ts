import { Pedido } from "../../../../pedido/core/domain/Pedido";
import { Optional } from "typescript-optional";

export const IPedidoServiceGateway: unique symbol = Symbol("IPedidoServiceGateway");

export interface IPedidoServiceGateway {
    obterPorId(pedidoId: number): Promise<Optional<Pedido>>;
    alterarStatus(pedido: Pedido): Promise<void>;
    obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<Optional<Pedido>>
}