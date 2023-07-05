import { Cliente } from "../../../gerencial/core/domain/Cliente";
import { Item } from "./Item";
import { StatusPedido } from "./StatusPedido";
import { Pagamento } from "../../../pagamento/core/domain/Pagamento";
import { AlteracaoStatusPedidoException } from "../../../gerencial/core/application/exception/AlteracaoStatusPagoPedidoException";

export class Pedido {
    get dataCadastro(): Date | undefined {
        return this._dataCadastro;
    }

    set dataCadastro(value: Date) {
        this._dataCadastro = value;
    }

    get dataConclusao(): Date | undefined {
        return this._dataConclusao;
    }

    set dataConclusao(value: Date) {
        this._dataConclusao = value;
    }
    get valorTotal(): number {
        let valorTotal = 0;
        this.itens?.forEach(i => valorTotal += i.valorTotal);
        return valorTotal;
    }

    get id(): number | undefined {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get cliente(): Cliente | undefined {
        return this._cliente;
    }

    set cliente(value: Cliente) {
        this._cliente = value;
    }

    get observacao(): string | undefined {
        return this._observacao;
    }

    set observacao(value: string) {
        this._observacao = value;
    }

    get status(): StatusPedido | undefined {
        return this._status;
    }

    set status(value: StatusPedido) {
        this._status = value;
    }

    get itens(): Item[] | undefined {
        return this._itens;
    }

    set itens(value: Item[]) {
        this._itens = value;
    }

    get pagamentos(): Pagamento[] | undefined {
        return this._pagamentos;
    }

    set pagamentos(value: Pagamento[]) {
        this._pagamentos = value;
    }

    constructor(
        private _id?: number,
        private _cliente?: Cliente,
        private _observacao?: string,
        private _status?: StatusPedido,
        private _dataCadastro?: Date,
        private _dataConclusao?: Date,
        private _itens?: Item[],
        private _pagamentos?: Pagamento[],
    ) {
    }

    static getInstancia(id: number, status: StatusPedido): Pedido {
        const pedido = new Pedido();
        pedido._id = id;
        pedido._status = status;
        return pedido;
    }

    temCliente(): boolean {
        return this._cliente !== undefined;
    }

    //TODO: Aplicar SOLID: este método tende a crescer sempre q surgir novos status. 
    //Por isso é sugerido que ele deve ser substituido por classe "Status", sendo que cada uma responde pela alteração de status
    //Assim Da pra usar chain of responsabilit ou factory - analisar
    setStatus(newStatus: StatusPedido) {
        switch (newStatus) {
            case StatusPedido.RECEBIDO:
                if (this._status === undefined || this._status === StatusPedido.RECEBIDO) {
                    this._status = newStatus;
                    return;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");

            case StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO:
                if (this._status === StatusPedido.RECEBIDO) {
                    this._status = newStatus;
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");

            case StatusPedido.PAGO || StatusPedido.PAGAMENTO_INVALIDO:
                if (this._status === StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO) {
                    this._status = newStatus;
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");

            case StatusPedido.EM_PREPARACAO:
                if (this._status === StatusPedido.PAGO) {
                    this._status = newStatus;
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");

            case StatusPedido.PRONTO:
                if (this._status === StatusPedido.EM_PREPARACAO) {
                    this._status = newStatus;
                    this._dataConclusao = new Date(Date.now());
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");

            case StatusPedido.FINALIZADO:
                if (this._status === StatusPedido.PRONTO) {
                    this._status = newStatus;
                    break;
                }
                throw new AlteracaoStatusPedidoException("O status do pedido não permite essa alteração");
        }
    }

    public getStatus(): StatusPedido {
        if (this._status === undefined) {
            this._status = StatusPedido.RECEBIDO;
        }
        return this._status;
    }

    public tempoEspera(): number {
        let dataFim: number = Date.now();
        if (this._dataConclusao) {
            dataFim = this._dataConclusao.getTime();
        }
        return dataFim - (this._dataCadastro !== undefined ? this._dataCadastro?.getTime() : Date.now());
    }

    removerCliente() {
        this._cliente = undefined;
    }
}