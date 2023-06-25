import { Optional } from "typescript-optional";
import { Pedido } from "../../domain/Pedido";
import { StatusPedido } from "../../domain/StatusPedido";

export interface IPedidoRepositoryGateway {
    criar(pedido: Pedido): Promise<number | undefined>;
    atualizarStatus(pedido: Pedido): Promise<void>;
    obterPorId(pedidoId: number): Promise<Optional<Pedido>>;
    obterEmAndamento(): Promise<Optional<Pedido[]>>;
    obterPorStatus(status: StatusPedido): Promise<Optional<Pedido[]>>;
}