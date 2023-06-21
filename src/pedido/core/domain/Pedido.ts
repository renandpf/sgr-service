import { Cliente } from "../../../gerencial/core/domain/Cliente";
import { Item } from "./Item";
import { StatusPedido } from "./StatusPedido";
import { Pagamento } from "../../../pagamento/core/domain/Pagamento";
import { AlteracaoStatusNovoPedidoException } from "src/gerencial/core/application/exception/AlteracaoStatusNovoPedidoException";
import { AlteracaoStatusPagoPedidoException } from "src/gerencial/core/application/exception/AlteracaoStatusPagoPedidoException";

export class Pedido {
    constructor(
        public readonly id?: number,
        private status?: StatusPedido,
        public readonly itens?: Item[],
        private cliente?: Cliente,
        public readonly pagamentos?: Pagamento[],
        public readonly observacao?: string,
        private dataCadastro?: Date,
        private dataConclusao?: Date
    ) { }

    inicializar() {
        this.dataCadastro?.setDate(Date.now());
        this.dataConclusao = undefined;
    }

    temCliente(): boolean {
        return this.cliente !== undefined;
    }

    setStatusNovo() {
        if (this.status === undefined || this.status === StatusPedido.AGUARDANDO_PAGAMENTO) {
            this.status = StatusPedido.AGUARDANDO_PAGAMENTO;
            return;
        }

        throw new AlteracaoStatusNovoPedidoException();
    }

    setStatusPago() {
        if (this.status == StatusPedido.AGUARDANDO_PAGAMENTO) {
            this.status = StatusPedido.PAGO;
            return;
        }

        throw new AlteracaoStatusPagoPedidoException();
    }

    //TODO: analisar. Este método permite falhas, no sentido de ser chamado no momento errado e não haver validação
    setStatus() {
        switch (this.status) {
            case StatusPedido.AGUARDANDO_PAGAMENTO:
                this.status = StatusPedido.RECEBIDO
                break;
            case StatusPedido.RECEBIDO:
                this.status = StatusPedido.PREPARANDO
                break;
            case StatusPedido.PREPARANDO:
                this.status = StatusPedido.PRONTO
                break;
            case StatusPedido.PRONTO:
                this.status = StatusPedido.FINALIZADO
                this.dataConclusao?.setDate(Date.now());
                break;
            default:
                break;
        }

        throw new AlteracaoStatusNovoPedidoException();
    }

    public getStatus(): StatusPedido | undefined {
        return this.status;
    }

    removerCliente() {
        this.cliente = undefined;
    }

    getCliente(): Cliente | undefined {
        return this.cliente;
    }
}