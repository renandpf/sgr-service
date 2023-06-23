import { Exception } from "@tsed/exceptions";
import { StatusPedido } from "./StatusPedido";

export class StatusPedidoEnumMapper{
    static numberParaEnum(codigo?: number): StatusPedido{
        switch (codigo){
            case 0:
                return StatusPedido.AGUARDANDO_PAGAMENTO;
            case 1:
                return StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO;
            case 2:
                return StatusPedido.PAGO;
            case 3:
                return StatusPedido.PREPARANDO;
            case 4:
                return StatusPedido.PRONTO;
            case 5:
                return StatusPedido.FINALIZADO;
            case 6:
                return StatusPedido.PAGAMENTO_INVALIDO;
            default:
                throw new Exception(500,"Status Inválido");
        }
    }

    static stringParaEnum(opcao?: string): StatusPedido{
        switch (opcao){
            case "AGUARDANDO_PAGAMENTO":
                return StatusPedido.AGUARDANDO_PAGAMENTO;
            case "AGUARDANDO_CONFIRMACAO_PAGAMENTO":
                return StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO;
            case "PAGO":
                return StatusPedido.PAGO;
            case "PREPARANDO":
                return StatusPedido.PREPARANDO;
            case "PRONTO":
                return StatusPedido.PRONTO;
            case "FINALIZADO":
                return StatusPedido.FINALIZADO;
            case "PAGAMENTO_INVALIDO":
                return StatusPedido.PAGAMENTO_INVALIDO;
            default:
                throw new Exception(500,"Status Inválido");
        }
    }

    static enumParaString(status? : StatusPedido): string {

        switch (status){
            case StatusPedido.AGUARDANDO_PAGAMENTO:
                return "AGUARDANDO_PAGAMENTO";
            case StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO:
                return "AGUARDANDO_CONFIRMACAO_PAGAMENTO";
            case StatusPedido.PAGO:
                return "PAGO";
            case StatusPedido.PREPARANDO:
                return "PREPARANDO";
            case StatusPedido.PRONTO:
                return "PRONTO";
            case StatusPedido.FINALIZADO:
                return "FINALIZADO";
            case StatusPedido.PAGAMENTO_INVALIDO:
                return "PAGAMENTO_INVALIDO";
            default:
                throw new Exception(500,"Status Inválido");
        }
    }

    static enumParaNumber(status? : StatusPedido): number{
        switch (status){
            case StatusPedido.AGUARDANDO_PAGAMENTO:
                return 0;
            case StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO:
                return 1;
            case StatusPedido.PAGO:
                return 2;
            case StatusPedido.PREPARANDO:
                return 3;
            case StatusPedido.PRONTO:
                return 4;
            case StatusPedido.FINALIZADO:
                return 5;
            case StatusPedido.PAGAMENTO_INVALIDO:
                return 6;
    
            default:
                throw new Exception(500,"Status Inválido");
        }
    }
}

