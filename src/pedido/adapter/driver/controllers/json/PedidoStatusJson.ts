import { Description, Enum, Example } from "@tsed/schema";
import { StatusPedido } from "../../../../core/domain/StatusPedido";

export class PedidoStatusJson {

    @Description("Categoria")
    @Example("RECEBIDO")
    @Enum("AGUARDANDO_PAGAMENTO", "RECEBIDO", "PREPARANDO", "PRONTO", "FINALIZADO")
    public readonly status?: StatusPedido;
}
