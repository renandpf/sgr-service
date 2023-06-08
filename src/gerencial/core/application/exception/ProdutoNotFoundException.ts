import { SystemBaseException } from "../../../../common/exception/SystemBaseException";

export class ProdutoNotFoundException extends SystemBaseException {
    public readonly code = "sgr.produtoNotFound";
    public readonly message = "Produto não foi encontrado";
    public readonly httpStatus = 404;
}