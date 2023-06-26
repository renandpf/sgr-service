import { Description, Enum, Example } from "@tsed/schema";
import { StatusPedido } from "../../../../core/domain/StatusPedido";

export class PedidoStatusJson {

    @Description("Categoria")
    @Example("PAGO")
    @Enum("AGUARDANDO_PAGAMENTO", "AGUARDANDO_CONFIRMACAO_PAGAMENTO", "PAGO", "RECEBIDO", "EM_PREPARACAO", "PRONTO", "FINALIZADO", "PAGAMENTO_INVALIDO")
    public readonly status?: StatusPedido;
}
