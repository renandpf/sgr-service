import { SystemBaseException } from "../../../../common";

export class ExclusaoProdutoAssociadoPedidoException extends SystemBaseException {
    public readonly code = "sgr.exclusionProductAssociatedWithOrder";
    public readonly message = "O produto está associado a pedido(s)";
    public readonly httpStatus = 422;
}