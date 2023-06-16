import { Pedido } from "src/pedido/core/domain/Pedido";
import { Optional } from "typescript-optional";

export interface IPedidoRepositoryGateway {
    obterPorId(pedidoId: number): Promise<Optional<Pedido>>;
}