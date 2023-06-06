import { SystemBaseException } from "./SystemBaseException";

export class ProdutoNotFoundException extends SystemBaseException {
    public code = "sgr.produtoNotFound";
    public message = "Produto não foi encontrado";
    public httpStatus = 404;
}