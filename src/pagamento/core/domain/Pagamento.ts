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

    validaCamposObrigatorios() {
        const mensagens = [];
        if (this.pedido === undefined || this.pedido.id === undefined) {
            mensagens.push("Identificador do pedido (pedido id)");
        }

        if (this.cartoesCredito === undefined || this.cartoesCredito.length === 0) {
            mensagens.push("Meio de pagamento não informado");
        }

        if (mensagens.length > 0) {
            throw new CamposObrigatoriosNaoPreechidoException(mensagens.join(","));
        }
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