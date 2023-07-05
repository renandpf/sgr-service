import { BodyParams, Inject, Logger, PathParams, QueryParams } from "@tsed/common";
import { Get, Patch, Post, Returns } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { IAtualizarStatusPedidoUseCase, ICriarPedidoUseCase, IObterPedidoUseCase } from "../../../core/application";
import { PedidoCadastroDto, PedidoConsultaDto, PedidoEmAndamentoDto, PedidoStatusDto } from "../../../core/dtos";
import {
    CamposObrigatoriosNaoPreechidoException
} from "../../../core/application/exceptions/CamposObrigatoriosNaoPreechidoException";
import { StatusPedidoEnumMapper } from "../../../core/domain";

@Controller("/pedidos")
export class PedidoController {

    constructor(
        @Inject(IObterPedidoUseCase) private obterPedidoUseCase: IObterPedidoUseCase,
        @Inject(ICriarPedidoUseCase) private criarPedidoUseCase: ICriarPedidoUseCase,
        @Inject(IAtualizarStatusPedidoUseCase) private atualizarStatusPedidoUseCase: IAtualizarStatusPedidoUseCase,
        @Inject() private logger: Logger
    ) {
    }

    @Get("/andamento")
    @Returns(200, PedidoEmAndamentoDto).Description("Pedidos em andamento")
    async obterEmAndamento(): Promise<PedidoEmAndamentoDto[]> {
        this.logger.info("Start em andamento");
        const pedidos = await this.obterPedidoUseCase.obterEmAndamento();
        this.logger.trace("End em andamento");
        return pedidos;
    }

    @Get("/:id")
    @Returns(200, PedidoConsultaDto).Description("Pedido")
    async obterPorId(@PathParams("id") id: number): Promise<PedidoConsultaDto> {
        this.logger.info("Start pedidoId={}", id);
        const pedido = await this.obterPedidoUseCase.obterPorId(id);
        this.logger.trace("End pedidoJson={}", pedido);
        return pedido;
    }

    @Post("")
    @Returns(201, PedidoConsultaDto).Description("Pedido criado")
    async criar(@BodyParams() pedidoDto: PedidoCadastroDto): Promise<PedidoConsultaDto> {
        this.logger.info("Start pedidoJson={}", pedidoDto);
        const pedido = await this.criarPedidoUseCase.criar(pedidoDto);
        this.logger.trace("End pedidoId={}", pedido?.id);
        return pedido;
    }

    @Patch("/:id/status")
    @Returns(200).Description("Nenhuma resposta")
    async atualizarStatus(@PathParams("id") id: number, @BodyParams() pedidoJson: PedidoStatusDto): Promise<void> {
        this.logger.info("Start id={}, pedidoJson={}", id, pedidoJson);
        if (pedidoJson.status === undefined) {
            throw new CamposObrigatoriosNaoPreechidoException("Status deve ser informado");
        }
        await this.atualizarStatusPedidoUseCase.atualizarStatus(id, StatusPedidoEnumMapper.stringParaEnum(pedidoJson.status as unknown as string));
        this.logger.trace("End pedidoId={}", id);
    }

    @Get()
    @Returns(200, PedidoConsultaDto)
    async obterPedidosPorStatus(
        @QueryParams("status") status: string,
        @QueryParams("identificadorPagamento") identificadorPagamento: string): Promise<PedidoConsultaDto[]> {
        this.logger.trace("Start status={}, identificadorPagamento={}", status, identificadorPagamento);

        const pedidos = await this.obterPedidoUseCase.obterPorStatusAndIdentificadorPagamento(status, identificadorPagamento);
        this.logger.trace("End pedidosJson={}", pedidos);

        return pedidos;
    }

    @Get("/pagamentos/:idPagamento")
    @Returns(200, PedidoConsultaDto)
    async obterPedidosPorIdentificdorPagamento(@PathParams("idPagamento") idPagamento: string): Promise<PedidoConsultaDto> {
        this.logger.trace("Start identificadorPagamento={}", idPagamento);
        const pedido = await this.obterPedidoUseCase.obterPorIdentificadorPagamento(idPagamento);
        this.logger.trace("End pedidoJson={}", pedido);
        return pedido;
    }    
}