import { Exception } from "@tsed/exceptions";
import { StatusPedido } from "./StatusPedido";

export class StatusPedidoEnumMapper{
    static numberParaEnum(codigo?: number): StatusPedido{
        switch (codigo){
            case 0:
                return StatusPedido.AGUARDANDO_PAGAMENTO;
            case 1:
                return StatusPedido.RECEBIDO;
            case 2:
                return StatusPedido.PREPARANDO;
            case 3:
                return StatusPedido.PRONTO;
            case 4:
                return StatusPedido.FINALIZADO;
            default:
                throw new Exception(500,"Status Inválido");
        }
    }

    static stringParaEnum(opcao?: string): StatusPedido{
        switch (opcao){
            case "AGUARDANDO_PAGAMENTO":
                return StatusPedido.AGUARDANDO_PAGAMENTO;
            case "RECEBIDO":
                return StatusPedido.RECEBIDO;
            case "PREPARANDO":
                return StatusPedido.PREPARANDO;
            case "PRONTO":
                return StatusPedido.PRONTO;
            case "FINALIZADO":
                return StatusPedido.FINALIZADO;
            default:
                throw new Exception(500,"Status Inválido");
        }
    }

    static enumParaString(status? : StatusPedido): string {

        switch (status) {
            case StatusPedido.AGUARDANDO_PAGAMENTO:
                return "AGUARDANDO_PAGAMENTO";
            case StatusPedido.RECEBIDO:
                return "RECEBIDO";
            case StatusPedido.PREPARANDO:
                return "PREPARANDO";
            case StatusPedido.PRONTO:
                return "PRONTO";
            case StatusPedido.FINALIZADO:
                return "FINALIZADO";
        }

        return ""
    }
}

