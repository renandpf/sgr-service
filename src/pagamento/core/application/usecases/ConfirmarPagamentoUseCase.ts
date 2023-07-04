import { Inject, Logger } from "@tsed/common";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { IPagamentoExternoServiceGateway, IPagamentoRepositoryGateway, IPedidoServiceGateway } from "../ports";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { StatusPedidoEnumMapper } from "../../../../pedido";
import { IConfirmarPagamentoUseCase } from "./IConfirmarPagamentoUseCase";

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
        @Inject(IPagamentoRepositoryGateway) private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,

    ) { }

    async confirmar(identificadorPagamento: string, statusPagamento: string): Promise<void> {
        this.logger.trace("Start identificadorPagamento={}, statusPagamento={}", identificadorPagamento, statusPagamento);

        const status = this.pagamentoExternoServiceGateway.mapStatus(statusPagamento);

        const pedido = await this.obtemPedidoPorPagamentoId(identificadorPagamento);

        pedido.setStatus(StatusPedidoEnumMapper.numberParaEnum(status));

        await this.pedidoServiceGateway.alterarStatus(pedido);

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