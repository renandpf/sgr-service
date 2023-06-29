import { Inject, Logger, } from "@tsed/common";
import { Service } from "@tsed/di";
import { IPedidoServiceGateway } from "../ports/IPedidoServiceGateway";

import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { PedidoServiceHttpGateway } from "../../../../pagamento/adapter/driven/http/PedidoServiceHttpGateway";
import { PagamentoMockExternalServiceHttpGateway } from "../../../../pagamento/adapter/driven/http/PagamentoMockServiceHttpGateway";
import { IPagamentoExternoServiceGateway } from "../ports/IPagamentoExternoServiceGateway";
import { PagamentoMySqlRepositoryGateway } from "../../../adapter/driven/repositories/PagamentoMySqlRepositoryGateway";
import { IPagamentoRepositoryGateway } from "../ports/IPagamentoRepositoryGateway";
import { StatusPedidoEnumMapper } from "src/pedido";

@Service()
export class ConfirmarPagamentoUseCase {

    constructor(
        @Inject() private logger: Logger,
        @Inject(PedidoServiceHttpGateway) private pedidoServiceGateway: IPedidoServiceGateway,
        @Inject(PagamentoMockExternalServiceHttpGateway) private pagamentoExternoServiceGateway: IPagamentoExternoServiceGateway,
        @Inject(PagamentoMySqlRepositoryGateway) private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,

    ) { }

    async confirmar(identificadorPagamento: string, statusPagamento: string): Promise<void> {
        this.logger.trace("Start identificadorPagamento={}, statusPagamento={}", identificadorPagamento, statusPagamento);

        const status = this.pagamentoExternoServiceGateway.mapStatus(statusPagamento);

        const pedido = await this.obtemPedidoPorPagamentoId(identificadorPagamento);

        pedido.setStatus(StatusPedidoEnumMapper.numberParaEnum(status));

        this.pedidoServiceGateway.alterarStatus(pedido);

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