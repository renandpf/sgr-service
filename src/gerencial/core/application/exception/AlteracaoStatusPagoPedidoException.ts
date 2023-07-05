import { SystemBaseException } from "../../../../common/exception/SystemBaseException";

export class AlteracaoStatusPedidoException extends SystemBaseException {
    public readonly code = "sgr.alteracaoStatus";
    public readonly httpStatus = 422;

    constructor(public message: string){
        super();
    }

}