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

@Service()
export class EfetuarPagamentoUseCase {

    constructor(
        @Inject() private logger: Logger,
        @Inject(PedidoServiceHttpGateway) private pedidoServiceGateway: IPedidoServiceGateway,
        @Inject(PagamentoMockExternalServiceHttpGateway) private pagamentoExternoServiceGateway: IPagamentoExternoServiceGateway,
        @Inject(PagamentoMySqlRepositoryGateway) private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,

        ) {}

    async efetuar(pagamento: Pagamento): Promise<number | undefined> {
        this.logger.trace("Start pagamento={}", pagamento);

        pagamento.validaCamposObrigatorios();

        const pedido = await this.obtemPedidoVerificandoSeEleExiste(pagamento); 
        pedido.setStatusAguardandoConfirmacaoPagamento();//FIXME: colocar aguardando confirmação pagamento
        
        const responsePagamentoDto = await this.pagamentoExternoServiceGateway.enviarPagamento(new RequestPagamentoDto(pagamento.cartoesCredito));
        pagamento.setIdentificadorPagamentoExterno(responsePagamentoDto.identificadorPagamento);

        pagamento.setPedido(pedido);

        //TODO: deve ocorrer rollback em caso de falha no passo de alterarStatus do serviço
        const idPagamento = await this.pagamentoRepositoryGateway.criar(pagamento);

        await this.pedidoServiceGateway.alterarStatus(pedido);

        /*TODO: implementar: 
            obter pedido - OK, 
            verificar status do pedido - OK, 
            chamar api de pagamento - OK, 
            alterar status do pedido - OK
            adicionar codigoPagamento (api terceira) no pedido - OK
            criar pagamento no database dados do pagamento externo - OK
            salvar pedido no database - via service(novo status)
        */

        this.logger.trace("End idPagamento={}", idPagamento);
        return idPagamento;
    }

    private async obtemPedidoVerificandoSeEleExiste(pagamento: Pagamento): Promise<Pedido> {
        const pedidoId = pagamento.getPedido()?.id;
        if ( pedidoId !== undefined) {
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