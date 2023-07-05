import { SystemBaseException } from "../../../../common/exception/SystemBaseException";

export class ErrorToAccessClienteServiceException extends SystemBaseException {
    public readonly code = "sgr.errorToAccessClientService";
    public readonly message = "Erro ao acessar o serviço cliente";
    public readonly httpStatus = 500;
}