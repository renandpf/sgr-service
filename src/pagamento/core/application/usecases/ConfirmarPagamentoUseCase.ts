import { Inject, Logger, } from "@tsed/common";
import { Service } from "@tsed/di";
import { Pagamento } from "../../domain/Pagamento";
import { IPedidoServiceGateway } from "../ports/IPedidoServiceGateway";

import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { CamposObrigatoriosNaoPreechidoException } from "../exceptions/CamposObrigatoriosNaoPreechidoException";
import { RequestPagamentoDto } from "src/pedido/core/application/dto/RequestPagamentoDto";
import { PedidoServiceHttpGateway } from "src/pagamento/adapter/driven/http/PedidoServiceHttpGateway";
import { PagamentoMockExternalServiceHttpGateway } from "src/pagamento/adapter/driven/http/PagamentoMockServiceHttpGateway";
import { IPagamentoExternoServiceGateway } from "../ports/IPagamentoExternoServiceGateway";
import { PagamentoMySqlRepositoryGateway } from "../../../adapter/driven/repositories/PagamentoMySqlRepositoryGateway";
import { IPagamentoRepositoryGateway } from "../ports/IPagamentoRepositoryGateway";
import { StatusPedido } from "src/pedido";

@Service()
export class ConfirmarPagamentoUseCase {

    constructor(
        @Inject() private logger: Logger,
        @Inject(PedidoServiceHttpGateway) private pedidoServiceGateway: IPedidoServiceGateway,
        @Inject(PagamentoMockExternalServiceHttpGateway) private pagamentoExternoServiceGateway: IPagamentoExternoServiceGateway,
        @Inject(PagamentoMySqlRepositoryGateway) private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,

        ) {}

    async confirmar(identificadorPagamento: string, statusPagamento: string): Promise<void> {
        this.logger.trace("Start identificadorPagamento={}, statusPagamento={}", identificadorPagamento, statusPagamento);

        const pedido = this.pedidoServiceGateway.obterPorIdentificadorPagamento(identificadorPagamento);
        const status = this.pagamentoExternoServiceGateway.mapStatus(statusPagamento);

        //TODO: Implementar
        /*
         *  1- Obter pedido pelo identificador (via service)
            2- Obter status do pedido a partir do serviço externo (map) - OK
            3- Alterar o status do pedido para: "PAGO"
            4- Salvar pedido (via service)
         */

        this.logger.trace("End");
    }

}