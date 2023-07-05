import { PagamentoDto } from "../PagamentoDto";
import { PedidoDto } from "../PedidoDto";

export class EfetuarPagamentoParamDto {
    constructor(public readonly pagamento: PagamentoDto){}

    setPedido(pedido: PedidoDto){
        this.pagamento.setPedido(pedido);
    }
}