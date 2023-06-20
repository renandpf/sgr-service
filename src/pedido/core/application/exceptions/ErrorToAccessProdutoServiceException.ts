import { SystemBaseException } from "../../../../common/exception/SystemBaseException";

export class ErrorToAccessProdutoServiceException extends SystemBaseException {
    public readonly code = "sgr.errorToAccessProductService";
    public readonly message = "Erro ao acessar o serviço produto";
    public readonly httpStatus = 500;
}