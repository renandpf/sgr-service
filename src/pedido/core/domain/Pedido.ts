import { Cliente } from "../../../gerencial/core/domain/Cliente";
import { Item } from "./Item";
import { StatusPedido } from "./StatusPedido";
import { Pagamento } from "../../../pagamento/core/domain/Pagamento";
import { AlteracaoStatusNovoPedidoException } from "src/gerencial/core/application/exception/AlteracaoStatusNovoPedidoException";

export class Pedido {
    constructor(
        public readonly id?: number,
        private status?: StatusPedido,
        public readonly itens?: Item[],
        private cliente?: Cliente,
        public readonly pagamentos?: Pagamento[],
        public readonly observacao?: string,
    ) { }

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

    setStatus() {
        switch (this.status) {
            case StatusPedido.AGUARDANDO_PAGAMENTO:
                this.status = StatusPedido.PREPARANDO
                break;
            case StatusPedido.PREPARANDO:
                this.status = StatusPedido.PRONTO
                break;
            case StatusPedido.PREPARANDO:
                this.status = StatusPedido.FINALIZADO
                break;
            default:
                break;
        }

        throw new AlteracaoStatusNovoPedidoException();
    }

    public getStatus(): StatusPedido | undefined {
        return this.status;
    }

    removerCliente(){
        this.cliente = undefined;
    }

    getCliente(): Cliente | undefined{
        return this.cliente;
    }
}