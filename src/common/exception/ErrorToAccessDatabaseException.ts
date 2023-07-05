import { SystemBaseException } from "..";

export class ErrorToAccessDatabaseException extends SystemBaseException {
    public readonly code = "sgr.errorToAccessException";
    public readonly message = "Erro ao acessar o banco de dados";
    public readonly httpStatus = 500;
}