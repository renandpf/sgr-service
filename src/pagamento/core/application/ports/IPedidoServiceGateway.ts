import { Pedido } from "src/pedido/core/domain/Pedido";
import { Optional } from "typescript-optional";

export interface IPedidoServiceGateway {
    obterPorId(pedidoId: number): Promise<Optional<Pedido>>;
    alterarStatus(pedido: Pedido): Promise<void>;
}