import { StatusPedido } from "../../domain/StatusPedido";

export interface IAtualizarStatusPedidoUseCase {
    atualizarStatus(pedidoId: number, status: StatusPedido): Promise<void>;
}