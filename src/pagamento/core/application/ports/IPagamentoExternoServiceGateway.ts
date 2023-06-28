import { StatusPedido } from "../../../../pedido";
import { RequestPagamentoDto } from "../../../../pedido/core/application/dto/RequestPagamentoDto";
import { ResponsePagamentoDto } from "../../../../pedido/core/application/dto/ResponsePagamentoDto";

export interface IPagamentoExternoServiceGateway {
    enviarPagamento(dto: RequestPagamentoDto): Promise<ResponsePagamentoDto>;
    mapStatus(statusPagamento: string): StatusPedido;
}