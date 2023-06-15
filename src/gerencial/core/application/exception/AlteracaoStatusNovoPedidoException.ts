import { SystemBaseException } from "../../../../common/exception/SystemBaseException";

export class AlteracaoStatusNovoPedidoException extends SystemBaseException {
    public readonly code = "sgr.alteracaoStatusNovoPedido";
    public readonly message = "O pedido deve estar sem status definido ou status equivalente a 'Aguardando Pagamento'";
    public readonly httpStatus = 422;
}