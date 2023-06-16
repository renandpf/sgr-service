import { StatusPedido } from "src/pedido/core/domain/StatusPedido";

export class StatusPedidoMapper {
    static mapper(status?: StatusPedido): number | undefined {
        if(status !== undefined){
            if(status === StatusPedido.AGUARDANDO_PAGAMENTO){
                return 1;
            }
        }
    }
}