import { Pedido } from "src/pedido";
import { CartaoCredito } from "./CartaoCredito";
import { CamposObrigatoriosNaoPreechidoException } from "../application/exceptions/CamposObrigatoriosNaoPreechidoException";

export class Pagamento {
    constructor(
        readonly id?: number,
        readonly pedido?: Pedido,
        readonly cartoesCredito?: CartaoCredito[],
        ){
    }

    validaCamposObrigatorios(){
        const mensagens = [];
        if (this.pedido === undefined || this.pedido.id === undefined){
            mensagens.push("Identificador do pedido (pedido id)");
        }
        
        if(this.cartoesCredito === undefined || this.cartoesCredito.length === 0){
            mensagens.push("Meio de pagamento não informado");
        }
        throw new CamposObrigatoriosNaoPreechidoException(mensagens.join(","));
    }

}