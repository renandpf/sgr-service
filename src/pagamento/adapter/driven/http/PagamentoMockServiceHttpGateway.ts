import { Inject, Service } from "@tsed/di";
import { Logger } from "@tsed/logger";
import { ErrorToAccessPagamentoServicoExternoException } from "src/pagamento/core/application/exceptions/ErrorToAccessPagamentoServicoExternoException";
import { IPagamentoExternoServiceGateway } from "src/pagamento/core/application/ports/IPagamentoExternoServiceGateway";
import { StatusPedido } from "src/pedido";

import { RequestPagamentoDto } from "src/pedido/core/application/dto/RequestPagamentoDto";
import { ResponsePagamentoDto } from "src/pedido/core/application/dto/ResponsePagamentoDto";


@Service()
export class PagamentoMockExternalServiceHttpGateway implements IPagamentoExternoServiceGateway {
    
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

    mapStatus(statusPagamento: string): StatusPedido {
        this.logger.trace("Start statusPagamento={}", statusPagamento);

        let statusPedido = StatusPedido.PAGAMENTO_INVALIDO;
        if(statusPagamento === "pago_sucesso"){
            statusPedido = StatusPedido.PAGO;
        }

        this.logger.trace("End statusPedido={}", statusPedido);
        return statusPedido;
    }
}