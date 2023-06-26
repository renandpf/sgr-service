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
        return StatusPedido.RECEBIDO;
      case 4:
        return StatusPedido.EM_PREPARACAO;
      case 5:
        return StatusPedido.PRONTO;
      case 6:
        return StatusPedido.FINALIZADO;
      case 7:
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
      case "RECEBIDO":
        return StatusPedido.RECEBIDO;
      case "EM_PREPARACAO":
        return StatusPedido.EM_PREPARACAO;
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
      case StatusPedido.RECEBIDO:
        return "RECEBIDO";
      case StatusPedido.EM_PREPARACAO:
        return "EM_PREPARACAO";
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
      case StatusPedido.RECEBIDO:
        return 3;
      case StatusPedido.EM_PREPARACAO:
        return 4;
      case StatusPedido.PRONTO:
        return 5;
      case StatusPedido.FINALIZADO:
        return 6;
      case StatusPedido.PAGAMENTO_INVALIDO:
        return 7;

      default:
        throw new Exception(500,"Status Inválido");
    }
  }
}

