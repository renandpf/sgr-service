import { Pedido } from "../../../pedido";
import { CartaoCredito } from "./CartaoCredito";
import { CamposObrigatoriosNaoPreechidoException } from "../application/exceptions/CamposObrigatoriosNaoPreechidoException";
import { SistemaExterno } from "./SistemaExterno";

export class Pagamento {

    private sistemaExterno?: SistemaExterno;

    constructor(
        readonly id?: number,
        private pedido?: Pedido,
        readonly cartoesCredito?: CartaoCredito[],
    ) {
    }

    setIdentificadorPagamentoExterno(identificadorPagamento: string) {
        this.sistemaExterno = new SistemaExterno(identificadorPagamento);
    }

    getIdentificadorPagamentoExterno(): string | undefined {
        return this.sistemaExterno?.identificadorPagamento;
    }

    setPedido(pedido: Pedido) {
        this.pedido = pedido;
    }

    getPedido(): Pedido | undefined {
        return this.pedido;
    }


}