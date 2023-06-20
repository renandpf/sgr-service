import { Inject, Logger, } from "@tsed/common";
import { Service } from "@tsed/di";
import { Pagamento } from "../../domain/Pagamento";
import { IPedidoServiceGateway } from "../ports/IPedidoServiceGateway";
import { PedidoServiceHttpGateway } from "src/pagamento/adapter/driven/repositories/PedidoServiceHttpGateway";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { Pedido } from "src/pedido/core/domain/Pedido";
import { CamposObrigatoriosNaoPreechidoException } from "../exceptions/CamposObrigatoriosNaoPreechidoException";

@Service()
export class EfetuarPagamentoUseCase {

    constructor(
        @Inject() private logger: Logger,
        @Inject(PedidoServiceHttpGateway) private pedidoServiceGateway: IPedidoServiceGateway,
        ) {
    }

    async efetuar(pagamento: Pagamento){
        this.logger.trace("Start pagamento={}", pagamento);

        pagamento.validaCamposObrigatorios();

        const pedido = await this.obtemPedidoVerificandoSeEleExiste(pagamento); 
        pedido.setStatusPago();


        /*TODO: implementar: 
            obter pedido - OK, 
            verificar status do pedido - OK, 
            chamar api de pagamento, 
            alterar status do pedido e salvar no database
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