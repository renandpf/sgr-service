import { SystemBaseException } from "../../../../common/exception/SystemBaseException";

export class CamposObrigatoriosNaoPreechidoException extends SystemBaseException {
    public readonly code = "sgr.camposObrigatoriosNaoPreenchido";
    public readonly httpStatus = 404;

    constructor(public readonly message: string){
        super();
    }
}