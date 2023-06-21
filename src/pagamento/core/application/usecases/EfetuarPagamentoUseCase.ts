import { Inject, Logger, } from "@tsed/common";
import { Service } from "@tsed/di";
import { Pagamento } from "../../domain/Pagamento";
import { IPedidoServiceGateway } from "../ports/IPedidoServiceGateway";

import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { CamposObrigatoriosNaoPreechidoException } from "../exceptions/CamposObrigatoriosNaoPreechidoException";
import { IPagamentoServiceExternoGateway } from "src/pedido/core/application/ports/IPagamentoServiceGateway";
import { RequestPagamentoDto } from "src/pedido/core/application/dto/RequestPagamentoDto";
import { PedidoServiceHttpGateway } from "src/pagamento/adapter/driven/http/PedidoServiceHttpGateway";
import { PagamentoMockExternalServiceHttpGateway } from "src/pagamento/adapter/driven/http/PagamentoMockServiceHttpGateway";

@Service()
export class EfetuarPagamentoUseCase {

    constructor(
        @Inject() private logger: Logger,
        @Inject(PedidoServiceHttpGateway) private pedidoServiceGateway: IPedidoServiceGateway,
        @Inject(PagamentoMockExternalServiceHttpGateway) private pagamentoServiceGateway: IPagamentoServiceExternoGateway,
        ) {
    }

    async efetuar(pagamento: Pagamento){
        this.logger.trace("Start pagamento={}", pagamento);

        pagamento.validaCamposObrigatorios();

        const pedido = await this.obtemPedidoVerificandoSeEleExiste(pagamento); 
        pedido.setStatusPago();

        const responsePagamentoDto = this.pagamentoServiceGateway.enviarPagamento(new RequestPagamentoDto(pagamento.cartoesCredito));



        /*TODO: implementar: 
            obter pedido - OK, 
            verificar status do pedido - OK, 
            chamar api de pagamento - OK, 
            alterar status do pedido - OK
            adicionar codigoPagamento (api terceira) no pedido
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