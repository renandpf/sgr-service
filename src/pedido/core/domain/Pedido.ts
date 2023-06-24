import { Cliente } from "../../../gerencial/core/domain/Cliente";
import { Item } from "./Item";
import { StatusPedido } from "./StatusPedido";
import { Pagamento } from "../../../pagamento/core/domain/Pagamento";
import { AlteracaoStatusPedidoException } from "src/gerencial/core/application/exception/AlteracaoStatusPagoPedidoException";

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

    //TODO: Aplicar SOLID: este método tende a crescer sempre q surgir novos status. 
    //Por isso é sugerido que ele deve ser substituido por classe "Status", sendo que cada uma responde pela alteração de status
    //Assim Da pra usar chain of responsabilit ou factory - analisar
    setStatus(newStatus: StatusPedido) {
        switch (newStatus) {
            case StatusPedido.AGUARDANDO_PAGAMENTO:
                if (this.status === undefined || this.status === StatusPedido.AGUARDANDO_PAGAMENTO) {
                    this.status = newStatus;
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");

            case StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO:
                if (this.status === StatusPedido.AGUARDANDO_PAGAMENTO) {
                    this.status = newStatus;
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");
                
            case StatusPedido.PAGO || StatusPedido.PAGAMENTO_INVALIDO:
                if (this.status === StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO) {
                    this.status = newStatus;
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");

            case StatusPedido.PREPARANDO:
                if (this.status === StatusPedido.PAGO) {
                    this.status = newStatus;
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");

            case StatusPedido.PRONTO:
                if (this.status === StatusPedido.PREPARANDO) {
                    this.status = newStatus;
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");

            case StatusPedido.FINALIZADO:
                if (this.status === StatusPedido.PRONTO) {
                    this.status = newStatus;
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");
        }
    }

    public getStatus(): StatusPedido {
        if(this.status === undefined){
            this.status = StatusPedido.AGUARDANDO_PAGAMENTO;
        }
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