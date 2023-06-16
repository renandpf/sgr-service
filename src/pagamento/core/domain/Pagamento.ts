import { Pedido } from "src/pedido";
import { CartaoCredito } from "./CartaoCredito";

export class Pagamento {
    constructor(
        readonly id?: number,
        readonly pedido?: Pedido,
        readonly cartoesCredito?: CartaoCredito[],
        ){
    }
}