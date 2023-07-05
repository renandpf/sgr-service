import { Description, Enum, Example } from "@tsed/schema";
import { StatusPedido } from "../domain";

export class PedidoStatusDto {

    @Description("Categoria")
    @Example("PAGO")
    @Enum("AGUARDANDO_CONFIRMACAO_PAGAMENTO", "PAGO", "RECEBIDO", "EM_PREPARACAO", "PRONTO", "FINALIZADO", "PAGAMENTO_INVALIDO")
    public readonly status?: StatusPedido;
}
