import { Inject, Logger } from "@tsed/common";
import { Pedido, StatusPedidoEnumMapper } from "../../domain";
import { IPedidoRepositoryGateway } from "../ports";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { IObterPedidoUseCase } from "../ports/IObterPedidoUseCase";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { PedidoConsultaDto, PedidoEmAndamentoDto } from "../../dtos";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IObterPedidoUseCase
})
export class ObterPedidoUseCase implements IObterPedidoUseCase {

    constructor(
        @Inject(IPedidoRepositoryGateway) private pedidoRepositoryGateway: IPedidoRepositoryGateway,
        @Inject() private logger: Logger) { }

    async obterPorId(id: number): Promise<PedidoConsultaDto> {
        this.logger.trace("Start id={}", id);

        const pedidoOp = await this.pedidoRepositoryGateway.obterPorId(id);
        if (pedidoOp.isEmpty()) {
            this.logger.warn("Pedido não encontrado. id={}", id);
            throw new PedidoNotFoundException();
        }

        const pedido = pedidoOp.get();
        this.logger.trace("End pedido={}", pedido);
        return PedidoConsultaDto.getInstance(pedido);
    }

    async obterEmAndamento(): Promise<PedidoEmAndamentoDto[]> {
        this.logger.trace("Start em andamento");

        const pedidoOp = await this.pedidoRepositoryGateway.obterEmAndamento();
        if (pedidoOp.isEmpty()) {
            this.logger.warn("Pedidos não retornados");
            throw new PedidoNotFoundException();
        }

        const pedidos = pedidoOp.get();

        this.logger.trace("End em andamento");
        return pedidos.map(pe => new PedidoEmAndamentoDto(Pedido.getInstance(pe)));
    }

    async obterPorStatusAndIdentificadorPagamento(status: string, identificadorPagamento: string): Promise<PedidoConsultaDto[]> {
        this.logger.trace("Start status={}, identificadorPagamento={}", status, identificadorPagamento);
        const pedidos = await this.pedidoRepositoryGateway.obterPorStatusAndIdentificadorPagamento(StatusPedidoEnumMapper.stringParaEnum(status), identificadorPagamento);
        this.logger.trace("End pedidos={}", pedidos);
        return pedidos.map(p => PedidoConsultaDto.getInstance(p));
    }

    async obterPorIdentificadorPagamento(identificadorPagamento: string): Promise<PedidoConsultaDto> {
        this.logger.trace("Start identificadorPagamento={}", identificadorPagamento);
        const pedidoOp = await this.pedidoRepositoryGateway.obterPorIdentificadorPagamento(identificadorPagamento);

        if (pedidoOp.isEmpty()) {
            this.logger.warn("Pedido não encontrado. identificadorPagamento={}", identificadorPagamento);
            throw new PedidoNotFoundException();
        }

        const pedido = pedidoOp.get();
        this.logger.trace("End pedido={}", pedido);
        return PedidoConsultaDto.getInstance(pedido);
    }

}