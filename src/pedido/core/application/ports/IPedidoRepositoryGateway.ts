import { Optional } from "typescript-optional";
import { Pedido } from "../../domain/Pedido";

export interface IPedidoRepositoryGateway {
    criar(pedido: Pedido): Promise<number | undefined>;
    atualizarStatus(pedido: Pedido): Promise<void>;
    obterPorId(pedidoId: number): Promise<Optional<Pedido>>;
    obterEmAndamento(): Promise<Optional<Pedido[]>>;
}