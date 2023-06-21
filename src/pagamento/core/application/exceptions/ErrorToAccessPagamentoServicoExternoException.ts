import { SystemBaseException } from "../../../../common/exception/SystemBaseException";

export class ErrorToAccessPagamentoServicoExternoException extends SystemBaseException {
    public readonly code = "sgr.erroAoAcessarSistemaPagamentoExterno";
    public readonly message = "Erro ao acessar sistema de pagamento externo";
    public readonly httpStatus = 500;
}