import { BodyParams, Inject, Logger, PathParams, QueryParams } from "@tsed/common";
import { Get, Patch, Post, Returns } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { CriarPedidoUseCase } from "../../../core/application/useCases/CriarPedidoUseCase";
import { AtualizarStatusPedidoUseCase } from "../../../core/application/useCases/AtualizarStatusPedidoUseCase";
import { PedidoCadastroJson } from "./json/PedidoCadastroJson";
import { ObterPedidoUseCase } from "src/pedido/core/application/useCases/ObterPedidoUseCase";
import { PedidoEmAndamentoJson } from "./json/PedidoEmAndamentoJson";
import {
    CamposObrigatoriosNaoPreechidoException
} from "src/pedido/core/application/exceptions/CamposObrigatoriosNaoPreechidoException";
import { StatusPedidoEnumMapper } from "src/pedido/core/domain/StatusPedidoEnumMapper";
import { PedidoConsultaJson } from "./json/PedidoConsultaJson";
import { PedidoStatusJson } from "./json/PedidoStatusJson";

@Controller("/pedidos")
export class PedidoController {

    constructor(
        @Inject() private obterPedidoUseCase: ObterPedidoUseCase,
        @Inject() private criarPedidoUseCase: CriarPedidoUseCase,
        @Inject() private atualizarStatusPedidoUseCase: AtualizarStatusPedidoUseCase,
        @Inject() private logger: Logger) {
    }

    @Get("/andamento")
    @Returns(200, PedidoEmAndamentoJson).Description("Pedidos em andamento")
    async obterEmAndamento(): Promise<PedidoEmAndamentoJson[]> {
        this.logger.info("Start em andamento");
        const pedidosJson: PedidoEmAndamentoJson[] = [];
        const pedido = await this.obterPedidoUseCase.obterEmAndamento();
        pedido.forEach(pe => {
            pedidosJson.push(new PedidoEmAndamentoJson(pe));
        });
        this.logger.trace("End em andamento");
        return pedidosJson;
    }

    @Get("/:id")
    @Returns(200, PedidoConsultaJson).Description("Pedido")
    async obterPorId(@PathParams("id") id: number): Promise<PedidoConsultaJson> {
        this.logger.info("Start pedidoId={}", id);
        const pedido = await this.obterPedidoUseCase.obterPorId(id);
        const pedidoJson = PedidoConsultaJson.getInstance(pedido);
        this.logger.trace("End pedidoJson={}", pedidoJson);
        return pedidoJson;
    }

    @Post("")
    @Returns(201, PedidoConsultaJson).Description("Pedido criado")
    async criar(@BodyParams() pedidoJson: PedidoCadastroJson): Promise<PedidoConsultaJson> {
        this.logger.info("Start pedidoJson={}", pedidoJson);
        const pedido = await this.criarPedidoUseCase.criar(pedidoJson.getDomain());
        this.logger.trace("End pedidoId={}", pedido?.id);
        return PedidoConsultaJson.getInstance(pedido);
    }

    @Patch("/:id/status")
    @Returns(200).Description("Nenhuma resposta")
    async atualizarStatus(@PathParams("id") id: number, @BodyParams() pedidoJson: PedidoStatusJson): Promise<void> {
        this.logger.info("Start id={}, pedidoJson={}", id, pedidoJson);
        if(pedidoJson.status === undefined){
            throw new CamposObrigatoriosNaoPreechidoException("Status deve ser informado");
        }
        await this.atualizarStatusPedidoUseCase.atualizarStatus(id, StatusPedidoEnumMapper.stringParaEnum(pedidoJson.status as unknown as string));
        this.logger.trace("End pedidoId={}", id);
    }

    @Get()
    @Returns(200, PedidoConsultaJson)
    async obterPedidosPorStatus(
            @QueryParams("status") status: string,
            @QueryParams("identificadorPagamento") identificadorPagamento: string): Promise<PedidoConsultaJson[]> {
        this.logger.trace("Start status={}, identificadorPagamento={}", status, identificadorPagamento);

        const pedidos = await this.obterPedidoUseCase.obterPorStatusAndIdentificadorPagamento(status, identificadorPagamento);

        const pedidosJson = pedidos.map(p => PedidoConsultaJson.getInstance(p));

        this.logger.trace("End pedidosJson={}", pedidosJson);

        return pedidosJson;
    }
}