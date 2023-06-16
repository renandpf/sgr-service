import { SystemBaseException } from "../../../../common";

export class ClienteExistenteException extends SystemBaseException {
    public readonly code = "sgr.clienteExistente";
    public readonly message = "Cliente já cadastrado";
    public readonly httpStatus = 400;
}