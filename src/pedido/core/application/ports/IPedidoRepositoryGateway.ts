import { Pedido } from "../../domain/Pedido";

export interface IPedidoRepositoryGateway {
    criar(pedido: Pedido): Promise<number | undefined>;
}