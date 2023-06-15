import { Cliente } from "../../../gerencial/core/domain/Cliente";
import { Item } from "./Item";
import { StatusPedido } from "./StatusPedido";
import { Pagamento } from "../../../pagamento/core/domain/Pagamento";

export class Pedido {
    constructor(
        public readonly status?: StatusPedido,
        public readonly itens?: Item[],
        public readonly cliente?: Cliente,
        public readonly pagamentos?: Pagamento[],
        public readonly observacao?: string,
    ){}

}