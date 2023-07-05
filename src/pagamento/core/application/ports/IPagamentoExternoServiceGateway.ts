import { StatusPedido } from "../../../../pedido";
import { RequestPagamentoDto } from "../../../../pedido/core/dtos/RequestPagamentoDto";
import { ResponsePagamentoDto } from "../../../../pedido/core/dtos/ResponsePagamentoDto";

export const IPagamentoExternoServiceGateway: unique symbol = Symbol("IPagamentoExternoServiceGateway");

export interface IPagamentoExternoServiceGateway {
    enviarPagamento(dto: RequestPagamentoDto): Promise<ResponsePagamentoDto>;
    mapStatus(statusPagamento: string): StatusPedido;
}