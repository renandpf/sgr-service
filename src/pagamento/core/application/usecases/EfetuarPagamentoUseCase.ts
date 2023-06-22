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
import { IPagamentoServiceExternoGateway } from "../ports/IPagamentoServiceGateway";

@Service()
export class EfetuarPagamentoUseCase {

    constructor(
        @Inject() private logger: Logger,
        @Inject(PedidoServiceHttpGateway) private pedidoServiceGateway: IPedidoServiceGateway,
        @Inject(PagamentoMockExternalServiceHttpGateway) private pagamentoServiceGateway: IPagamentoServiceExternoGateway,
        ) {}

    async efetuar(pagamento: Pagamento){
        this.logger.trace("Start pagamento={}", pagamento);

        pagamento.validaCamposObrigatorios();

        const pedido = await this.obtemPedidoVerificandoSeEleExiste(pagamento); 
        pedido.setStatusAguardandoConfirmacaoPagamento();//FIXME: colocar aguardando confirmação pagamento

        const responsePagamentoDto = await this.pagamentoServiceGateway.enviarPagamento(new RequestPagamentoDto(pagamento.cartoesCredito));
        pagamento.setIdentificadorPagamentoExterno(responsePagamentoDto.identificadorPagamento);

        /*TODO: implementar: 
            obter pedido - OK, 
            verificar status do pedido - OK, 
            chamar api de pagamento - OK, 
            alterar status do pedido - OK
            adicionar codigoPagamento (api terceira) no pedido - OK
            salvar pedido no database
        */

        this.logger.trace("End");
    }

    private async obtemPedidoVerificandoSeEleExiste(pagamento: Pagamento): Promise<Pedido> {
        if (pagamento.pedido?.id) {
            const pedidoOp = await this.pedidoServiceGateway.obterPorId(pagamento.pedido?.id);
            if (pedidoOp.isEmpty()) {
                this.logger.warn("Pedido não encontrado. pagamento.pedido.id={}", pagamento.pedido?.id);
                throw new PedidoNotFoundException();
            }

            return pedidoOp.get();
        }

        throw new CamposObrigatoriosNaoPreechidoException("Identificador do pedido (id)");
    }
}