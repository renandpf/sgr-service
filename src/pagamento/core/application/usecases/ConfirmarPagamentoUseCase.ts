import { Inject, Logger } from "@tsed/common";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { IPagamentoExternoServiceGateway, IPedidoServiceGateway } from "../ports";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { Pedido } from "../../../../pedido";
import { IConfirmarPagamentoUseCase } from "./IConfirmarPagamentoUseCase";
import { PedidoDto } from "../../dto/PedidoDto";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IConfirmarPagamentoUseCase
})
export class ConfirmarPagamentoUseCase implements IConfirmarPagamentoUseCase {

    constructor(
        @Inject() private logger: Logger,
        @Inject(IPedidoServiceGateway) private pedidoServiceGateway: IPedidoServiceGateway,
        @Inject(IPagamentoExternoServiceGateway) private pagamentoExternoServiceGateway: IPagamentoExternoServiceGateway,
    ) { }

    async confirmar(identificadorPagamento: string, statusPagamento: string): Promise<void> {
        this.logger.trace("Start identificadorPagamento={}, statusPagamento={}", identificadorPagamento, statusPagamento);

        const pedidoDto = await this.obtemPedidoPorPagamentoId(identificadorPagamento);
        
        const status = this.pagamentoExternoServiceGateway.mapStatus(statusPagamento);
        const pedido = Pedido.getInstancia(pedidoDto.id, pedidoDto.statusId);
        pedido.setStatus(status);

        const pedidoDtoStatusPago = new PedidoDto(pedido.id as number, pedido.getStatus());

        await this.pedidoServiceGateway.alterarStatus(pedidoDtoStatusPago);

        this.logger.trace("End");
    }


    private async obtemPedidoPorPagamentoId(identificadorPagamento: string) {
        const pedidoOp = await this.pedidoServiceGateway.obterPorIdentificadorPagamento(identificadorPagamento);
        if (pedidoOp.isEmpty()) {
            this.logger.warn("Pedido não encontrado. identificadorPagamento={}", identificadorPagamento);
            throw new PedidoNotFoundException();
        }

        return pedidoOp.get();
    }
}