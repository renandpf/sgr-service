import { PedidoConsultaDto, PedidoEmAndamentoDto } from "../../dtos";

export const IObterPedidoUseCase: unique symbol = Symbol("IObterPedidoUseCase");

export interface IObterPedidoUseCase {
    obterPorId(id: number): Promise<PedidoConsultaDto>;
    obterEmAndamento(): Promise<PedidoEmAndamentoDto[]>;
    obterPorStatusAndIdentificadorPagamento(status: string, identificadorPagamento: string): Promise<PedidoConsultaDto[]>;
    obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<PedidoConsultaDto>
}