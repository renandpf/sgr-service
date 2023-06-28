import { Inject, Logger, } from "@tsed/common";
import { Service } from "@tsed/di";
import { Pagamento } from "../../domain/Pagamento";
import { IPedidoServiceGateway } from "../ports/IPedidoServiceGateway";

import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { Pedido } from "../../../../pedido/core/domain/Pedido";
import { CamposObrigatoriosNaoPreechidoException } from "../exceptions/CamposObrigatoriosNaoPreechidoException";
import { RequestPagamentoDto } from "../../../../pedido/core/application/dto/RequestPagamentoDto";
import { PedidoServiceHttpGateway } from "../../../../pagamento/adapter/driven/http/PedidoServiceHttpGateway";
import { PagamentoMockExternalServiceHttpGateway } from "../../../../pagamento/adapter/driven/http/PagamentoMockServiceHttpGateway";
import { IPagamentoExternoServiceGateway } from "../ports/IPagamentoExternoServiceGateway";
import { PagamentoMySqlRepositoryGateway } from "../../../adapter/driven/repositories/PagamentoMySqlRepositoryGateway";
import { IPagamentoRepositoryGateway } from "../ports/IPagamentoRepositoryGateway";
import { StatusPedido } from "../../../../pedido";

@Service()
export class EfetuarPagamentoUseCase {

    constructor(
        @Inject() private logger: Logger,
        @Inject(PedidoServiceHttpGateway) private pedidoServiceGateway: IPedidoServiceGateway,
        @Inject(PagamentoMockExternalServiceHttpGateway) private pagamentoExternoServiceGateway: IPagamentoExternoServiceGateway,
        @Inject(PagamentoMySqlRepositoryGateway) private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,

    ) { }

    async efetuar(pagamento: Pagamento): Promise<number | undefined> {
        this.logger.trace("Start pagamento={}", pagamento);

        pagamento.validaCamposObrigatorios();

        const pedido = await this.obtemPedidoVerificandoSeEleExiste(pagamento);
        pedido.setStatus(StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO);

        const responsePagamentoDto = await this.pagamentoExternoServiceGateway.enviarPagamento(new RequestPagamentoDto(pagamento.cartoesCredito));
        pagamento.setIdentificadorPagamentoExterno(responsePagamentoDto.identificadorPagamento);

        pagamento.setPedido(pedido);

        //TODO: deve ocorrer rollback em caso de falha no passo de alterarStatus do serviço
        const idPagamento = await this.pagamentoRepositoryGateway.criar(pagamento);

        await this.pedidoServiceGateway.alterarStatus(pedido);

        this.logger.trace("End idPagamento={}", idPagamento);
        return idPagamento;
    }

    private async obtemPedidoVerificandoSeEleExiste(pagamento: Pagamento): Promise<Pedido> {
        const pedidoId = pagamento.getPedido()?.id;
        if (pedidoId !== undefined) {
            const pedidoOp = await this.pedidoServiceGateway.obterPorId(pedidoId);
            if (pedidoOp.isEmpty()) {
                this.logger.warn("Pedido não encontrado. pagamento.pedido.id={}", pagamento.getPedido()?.id);
                throw new PedidoNotFoundException();
            }

            return pedidoOp.get();
        }

        throw new CamposObrigatoriosNaoPreechidoException("Identificador do pedido (id)");
    }
}