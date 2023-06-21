import { Inject, Service } from "@tsed/di";
import { Logger } from "@tsed/logger";
import { ErrorToAccessPagamentoServicoExternoException } from "src/pagamento/core/application/exceptions/ErrorToAccessPagamentoServicoExternoException";
import { RequestPagamentoDto } from "src/pedido/core/application/dto/RequestPagamentoDto";
import { ResponsePagamentoDto } from "src/pedido/core/application/dto/ResponsePagamentoDto";
import { IPagamentoServiceExternoGateway } from "src/pedido/core/application/ports/IPagamentoServiceGateway";

@Service()
export class PagamentoMockExternalServiceHttpGateway implements IPagamentoServiceExternoGateway {
    
    @Inject()
    private logger: Logger;

    async enviarPagamento(dto: RequestPagamentoDto): Promise<ResponsePagamentoDto> {
        try {
            this.logger.trace("Start dto={}", dto);
    
            this.logger.warn("### MOCK ###")
            const responsePromise = Promise.resolve(new ResponsePagamentoDto("any_payment_id"));
    
            this.logger.trace("End responsePromise={}", responsePromise);
    
            return responsePromise;
            
        } catch (error) {
            this.logger.error(error);
            throw new ErrorToAccessPagamentoServicoExternoException();
            
        }
    }

}