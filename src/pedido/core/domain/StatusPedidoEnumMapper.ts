import { Exception } from "@tsed/exceptions";
import { StatusPedido } from "./StatusPedido";

export class StatusPedidoEnumMapper {
  
  static numberParaEnum(codigo?: number): StatusPedido{
    switch (codigo){
      case 0:
        return StatusPedido.RECEBIDO;
      case 1:
        return StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO;
      case 2:
        return StatusPedido.PAGO;
      case 3:
        return StatusPedido.EM_PREPARACAO;
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

  static numberParaString(codigo?: number): string {
    const enumStatus = StatusPedidoEnumMapper.numberParaEnum(codigo);
    return StatusPedidoEnumMapper.enumParaString(enumStatus);
  }
  
  static stringParaEnum(opcao?: string): StatusPedido{
    switch (opcao){
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
      case StatusPedido.RECEBIDO:
        return 0;
      case StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO:
        return 1;
      case StatusPedido.PAGO:
        return 2;
      case StatusPedido.EM_PREPARACAO:
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

