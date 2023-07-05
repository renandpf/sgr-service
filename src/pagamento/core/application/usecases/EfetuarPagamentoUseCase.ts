import { Inject, Logger } from "@tsed/common";
import { Injectable, ProviderScope, ProviderType } from "@tsed/di";
import { IPagamentoExternoServiceGateway, IPagamentoRepositoryGateway, IPedidoServiceGateway } from "../ports";
import { PedidoNotFoundException } from "../exceptions/PedidoNotFoundException";
import { Pedido, StatusPedido } from "../../../../pedido";
import { CamposObrigatoriosNaoPreechidoException } from "../exceptions/CamposObrigatoriosNaoPreechidoException";
import { IEfetuarPagamentoUseCase } from "./IEfetuarPagamentoUseCase";
import { PedidoServiceHttpGateway } from "../../../adapter/driven/http/PedidoServiceHttpGateway";
import { PagamentoMockExternalServiceHttpGateway } from "../../../adapter/driven/http/PagamentoMockServiceHttpGateway";
import { PagamentoMySqlRepositoryGateway } from "../../../adapter/driven/repositories/PagamentoMySqlRepositoryGateway";
import { RequestPagamentoDto } from "../../../../pedido/core/dtos/RequestPagamentoDto";
import { EfetuarPagamentoParamDto } from "../../dto/flows/EfetuarPagamentoParamDto";
import { EfetuarPagamentoReturnDto } from "../../dto/flows/EfetuarPagamentoReturnDto";
import { PagamentoDto } from "../../dto/PagamentoDto";
import { PedidoDto } from "../../dto/PedidoDto";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.REQUEST,
    provide: IEfetuarPagamentoUseCase
})
export class EfetuarPagamentoUseCase implements IEfetuarPagamentoUseCase {

    constructor(
        @Inject() private logger: Logger,
        @Inject(PedidoServiceHttpGateway) private pedidoServiceGateway: IPedidoServiceGateway,
        @Inject(PagamentoMockExternalServiceHttpGateway) private pagamentoExternoServiceGateway: IPagamentoExternoServiceGateway,
        @Inject(PagamentoMySqlRepositoryGateway) private pagamentoRepositoryGateway: IPagamentoRepositoryGateway,

    ) { }

    async efetuar(dto: EfetuarPagamentoParamDto): Promise<EfetuarPagamentoReturnDto> {
        this.logger.trace("Start dto={}", dto);

        this.validaCamposObrigatorios(dto.pagamento);

        const pedidoDto = await this.obtemPedidoVerificandoSeEleExiste(dto.pagamento);
        
        const pedido = Pedido.getInstancia(pedidoDto.id, pedidoDto.statusId);
        pedido.setStatus(StatusPedido.AGUARDANDO_CONFIRMACAO_PAGAMENTO);

        const responsePagamentoDto = await this.pagamentoExternoServiceGateway.enviarPagamento(new RequestPagamentoDto(dto.pagamento.cartoesCredito));
        dto.pagamento.setIdentificadorPagamentoExterno(responsePagamentoDto.identificadorPagamento);
        dto.setPedido(pedidoDto);

        //TODO: deve ocorrer rollback em caso de falha no passo de alterarStatus do serviço
        const idPagamento = await this.pagamentoRepositoryGateway.criar(dto.pagamento);

        await this.pedidoServiceGateway.alterarStatus(pedidoDto);

        const returnDto = new EfetuarPagamentoReturnDto(idPagamento as number);
        this.logger.trace("End returnDto={}", returnDto);
        return returnDto;
    }

    private async obtemPedidoVerificandoSeEleExiste(pagamento: PagamentoDto): Promise<PedidoDto> {
        const pedidoId = pagamento.getPedido()?.id;
        if (pedidoId !== undefined) {
            const pedidoOp = await this.pedidoServiceGateway.obterPorId(pedidoId);
            if (pedidoOp.isEmpty()) {
                this.logger.warn("Pedido não encontrado. pagamento.pedido.id={}", pagamento.getPedido()?.id);
                throw new PedidoNotFoundException();
            }

            return pedidoOp.get();
        }

        throw new CamposObrigatoriosNaoPreechidoException("Identificador do pedido (id)");
    }

    private validaCamposObrigatorios(pagamentoDto: PagamentoDto) {
        const mensagens = [];
        if (pagamentoDto.getPedido() === undefined) {
            mensagens.push("Identificador do pedido (pedido id)");
        }

        if (pagamentoDto.cartoesCredito === undefined || pagamentoDto.cartoesCredito.length === 0) {
            mensagens.push("Meio de pagamento não informado");
        }

        if (mensagens.length > 0) {
            throw new CamposObrigatoriosNaoPreechidoException(mensagens.join(","));
        }
    }

}