import { Pedido } from "../../domain";

export const ICriarPedidoUseCase: unique symbol = Symbol("ICriarPedidoUseCase");

export interface ICriarPedidoUseCase {
    criar(pedido: Pedido): Promise<Pedido>;
}