import { Optional } from "typescript-optional";
import { PedidoDto } from "../../dto/PedidoDto";

export const IPedidoServiceGateway: unique symbol = Symbol("IPedidoServiceGateway");

export interface IPedidoServiceGateway {
    obterPorId(pedidoId: number): Promise<Optional<PedidoDto>>;
    alterarStatus(pedido: PedidoDto): Promise<void>;
    obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<Optional<PedidoDto>>
}