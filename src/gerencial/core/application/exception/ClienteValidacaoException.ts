import { SystemBaseException } from "../../../../common";

export class ClienteValidacaoException extends SystemBaseException {
    public readonly code: string = "sgr.clienteValidacao";
    public readonly message: string;
    public readonly httpStatus: number = 400;

    constructor(mensagem: string) {
        super(mensagem);
        this.message = mensagem;
    }
}