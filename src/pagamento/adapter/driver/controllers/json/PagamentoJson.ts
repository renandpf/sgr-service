import { Pagamento } from "../../../../../pagamento/core/domain/Pagamento";
import { CartaoCreditoJson } from "./CartaoCreditoJson";
import { CartaoCredito } from "../../../../../pagamento/core/domain/CartaoCredito";
import { Pedido } from "../../../../../pedido/core/domain/Pedido";

export class PagamentoJson {
    readonly pedidoId: number;
    readonly cartoesCreditos: CartaoCreditoJson[];

    getDomain(): Pagamento {
        const cartoesCredito = this.cartoesCreditos.map(cc => new CartaoCredito(cc.numero, cc.cvv, cc.nome, cc.cpf, cc.valor));
        const pedido = new Pedido(this.pedidoId);
        return new Pagamento(undefined, pedido, cartoesCredito);
    }

}