import { Pedido } from "../../domain/Pedido";

export interface ICriarPedidoUseCase {
    criar(pedido: Pedido): Promise<Pedido>;
}