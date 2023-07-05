import { CartaoCreditoJson } from "./CartaoCreditoJson";
import { PagamentoDto } from "../../../../core/dto/PagamentoDto";
import { PedidoDto } from "../../../../core/dto/PedidoDto";
import { CartaoCreditoDto } from "../../../../core/dto/CartaoCreditoDto";

export class PagamentoJson {
    readonly pedidoId: number;
    readonly cartoesCreditos: CartaoCreditoJson[];

    getDto(): PagamentoDto {
        const cartoesCredito = this.cartoesCreditos.map(cc => new CartaoCreditoDto(cc.numero, cc.cvv, cc.nome, cc.cpf, cc.valor));
        const pedido = new PedidoDto(this.pedidoId, undefined as unknown as number);
        return new PagamentoDto(undefined, pedido, cartoesCredito);
    }
}