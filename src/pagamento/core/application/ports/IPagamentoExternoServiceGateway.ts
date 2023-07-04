import { StatusPedido } from "../../../../pedido";
import { RequestPagamentoDto } from "../../../../pedido/core/application/dto/RequestPagamentoDto";
import { ResponsePagamentoDto } from "../../../../pedido/core/application/dto/ResponsePagamentoDto";

export const IPagamentoExternoServiceGateway: unique symbol = Symbol("IPagamentoExternoServiceGateway");

export interface IPagamentoExternoServiceGateway {
    enviarPagamento(dto: RequestPagamentoDto): Promise<ResponsePagamentoDto>;
    mapStatus(statusPagamento: string): StatusPedido;
}