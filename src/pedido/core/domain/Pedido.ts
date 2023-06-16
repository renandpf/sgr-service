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
        public readonly cliente?: Cliente,
        public readonly pagamentos?: Pagamento[],
        public readonly observacao?: string,
    ){}

    temCliente(): boolean{
        return this.cliente !== undefined;
    }

    setStatusNovo(){
        if(this.status === undefined || this.status === StatusPedido.AGUARDANDO_PAGAMENTO){
            this.status = StatusPedido.AGUARDANDO_PAGAMENTO;
            return;
        } 

        throw new AlteracaoStatusNovoPedidoException();
    }

    public getStatus(): StatusPedido | undefined {
        return this.status;
    }

}