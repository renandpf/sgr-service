import { Cliente } from "../../../gerencial/core/domain/Cliente";
import { Item } from "./Item";
import { StatusPedido } from "./StatusPedido";
import { Pagamento } from "../../../pagamento/core/domain/Pagamento";
import { AlteracaoStatusNovoPedidoException } from "src/gerencial/core/application/exception/AlteracaoStatusNovoPedidoException";
import { AlteracaoStatusPagoPedidoException } from "src/gerencial/core/application/exception/AlteracaoStatusPagoPedidoException";

export class Pedido {

    private dataCadastro: Date;
    constructor(
        public readonly id?: number,
        private status?: StatusPedido,
        public readonly itens?: Item[],
        private cliente?: Cliente,
        public readonly pagamentos?: Pagamento[],
        public readonly observacao?: string,
        dataCadastro?: Date,
        private dataConclusao?: Date
    ) {
        if(dataCadastro != undefined){
            this.dataCadastro.setDate(dataCadastro.getTime());
        }
    }

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

    setStatusAguardandoConfirmacaoPagamento() {
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
                this.dataConclusao?.setDate(Date.now());
                break;
            case StatusPedido.PRONTO:
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

    public getDataCadastro(): Date | undefined {
        return this.dataCadastro;
    }

    public getTempoEspera(): number {
        let dataFim: number = Date.now();
        if(this.dataConclusao){
            dataFim = this.dataConclusao.getTime();
        }
        return dataFim -  this.dataCadastro.getTime();
    }

    public getDataConclusao(): Date | undefined {
        return this.dataConclusao;
    }

    removerCliente() {
        this.cliente = undefined;
    }

    getCliente(): Cliente | undefined {
        return this.cliente;
    }
}