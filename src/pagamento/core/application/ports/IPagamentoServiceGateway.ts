import { RequestPagamentoDto } from "../../../../pedido/core/application/dto/RequestPagamentoDto";
import { ResponsePagamentoDto } from "../../../../pedido/core/application/dto/ResponsePagamentoDto";

export interface IPagamentoServiceExternoGateway {
    enviarPagamento(dto: RequestPagamentoDto): Promise<ResponsePagamentoDto>;
}