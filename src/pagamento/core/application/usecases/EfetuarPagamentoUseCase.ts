import { Inject, Logger } from "@tsed/common";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { Pagamento } from "../../domain/Pagamento";
import { IPagamentoExternoServiceGateway, IPagamentoRepositoryGateway, IPedidoServiceGateway } from "../ports";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { Pedido, StatusPedido } from "../../../../pedido";
import { CamposObrigatoriosNaoPreechidoException } from "../exceptions/CamposObrigatoriosNaoPreechidoException";
import { IEfetuarPagamentoUseCase } from "./IEfetuarPagamentoUseCase";
import { PedidoServiceHttpGateway } from "../../../adapter/driven/http/PedidoServiceHttpGateway";
import { PagamentoMockExternalServiceHttpGateway } from "../../../adapter/driven/http/PagamentoMockServiceHttpGateway";
import { PagamentoMySqlRepositoryGateway } from "../../../adapter/driven/repositories/PagamentoMySqlRepositoryGateway";
import { RequestPagamentoDto } from "../../../../pedido/core/application/dto/RequestPagamentoDto";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IEfetuarPagamentoUseCase
})
export class EfetuarPagamentoUseCase implements IEfetuarPagamentoUseCase {

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