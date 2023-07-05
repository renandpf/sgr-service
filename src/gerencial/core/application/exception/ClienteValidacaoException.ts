import { SystemBaseException } from "../../../../common";

export class ClienteValidacaoException extends SystemBaseException {
    public readonly code: string = "sgr.clienteValidacao";
    public readonly httpStatus: number = 400;

    constructor(mensagem: string) {
        super();
        this.message = mensagem;
    }
}