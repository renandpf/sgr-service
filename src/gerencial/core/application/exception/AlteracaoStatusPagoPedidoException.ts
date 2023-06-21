import { SystemBaseException } from "../../../../common/exception/SystemBaseException";

export class AlteracaoStatusPagoPedidoException extends SystemBaseException {
    public readonly code = "sgr.alteracaoStatusPago";
    public readonly message = "O pedido deve estar com status equivalente a 'Aguardando Pagamento'";
    public readonly httpStatus = 422;
}