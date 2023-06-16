import { SystemBaseException } from "../../../../common";

export class ClienteNaoEncontradoException extends SystemBaseException {
    public readonly code = "sgr.clienteNaoEncontrado";
    public readonly message = "Cliente não foi encontrado";
    public readonly httpStatus = 404;
}