import { SystemBaseException } from "../../../../common";

export class ProdutoValidacaoException extends SystemBaseException {
    public readonly code: string = "sgr.produtoValidacao";
    public readonly httpStatus: number = 400;

    constructor(mensagem: string) {
        super();
        this.message = mensagem;
    }
}