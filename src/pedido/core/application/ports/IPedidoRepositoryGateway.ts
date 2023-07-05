import { Optional } from "typescript-optional";
import { StatusPedido } from "../../domain";
import { PedidoDto } from "../../dtos/PedidoDto";

export const IPedidoRepositoryGateway: unique symbol = Symbol("IPedidoRepositoryGateway");

export interface IPedidoRepositoryGateway {
    criar(pedido: PedidoDto): Promise<number | undefined>;
    atualizarStatus(pedido: PedidoDto): Promise<void>;
    obterPorId(pedidoId: number): Promise<Optional<PedidoDto>>;
    obterEmAndamento(): Promise<Optional<PedidoDto[]>>;
    obterPorStatusAndIdentificadorPagamento(status: StatusPedido, identificadorPagamento: string): Promise<PedidoDto[]>;
    obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<Optional<PedidoDto>>;
}