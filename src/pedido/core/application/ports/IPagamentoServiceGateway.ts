import { RequestPagamentoDto } from "../dto/RequestPagamentoDto";
import { ResponsePagamentoDto } from "../dto/ResponsePagamentoDto";

export interface IPagamentoServiceExternoGateway {
    enviarPagamento(dto: RequestPagamentoDto): Promise<ResponsePagamentoDto>;
}