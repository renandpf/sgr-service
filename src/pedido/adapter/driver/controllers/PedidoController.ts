import { BodyParams, Inject, Logger, PathParams } from "@tsed/common";
import { Get, Patch, Post, Returns } from "@tsed/schema";
import { Controller } from "@tsed/di";
import { CriarPedidoUseCase } from "../../../core/application/useCases/CriarPedidoUseCase";
import { AtualizarStatusPedidoUseCase } from "../../../core/application/useCases/AtualizarStatusPedidoUseCase";
import { PedidoJson } from "./json/PedidoJson";
import { ObterPedidoUseCase } from "src/pedido/core/application/useCases/ObterPedidoUseCase";
import { PedidoEmAndamentoJson } from "./json/PedidoEmAndamentoJson";
import { CamposObrigatoriosNaoPreechidoException } from "src/pedido/core/application/exceptions/CamposObrigatoriosNaoPreechidoException";
import { StatusPedidoEnumMapper } from "src/pedido/core/domain/StatusPedidoEnumMapper";

@Controller("/pedidos")
export class PedidoController {

    constructor(
        @Inject() private obterPedidoUseCase: ObterPedidoUseCase,
        @Inject() private criarPedidoUseCase: CriarPedidoUseCase,
        @Inject() private atualizarStatusPedidoUseCase: AtualizarStatusPedidoUseCase,
        @Inject() private logger: Logger) {
    }

    @Get("/:id")
    @Returns(200, PedidoJson).Description("Pedido")
    async obterPorId(@PathParams("id") id: number): Promise<PedidoJson> {
        this.logger.info("Start pedidoId={}", id);
        const pedido = await this.obterPedidoUseCase.obterPorId(id);
        const pedidoJson = PedidoJson.getInstance(pedido);
        this.logger.trace("End pedidoJson={}", pedidoJson);
        return pedidoJson;
    }

    @Post("")
    @Returns(201).Description("ID do pedido criado")
    async criar(@BodyParams() pedidoJson: PedidoJson): Promise<string> {
        this.logger.info("Start pedidoJson={}", pedidoJson);
        const pedidoId = await this.criarPedidoUseCase.criar(pedidoJson.getDomain());
        this.logger.trace("End pedidoId={}", pedidoId);
        return `${pedidoId}`;
    }

    @Patch("/:id/status")
    @Returns(200).Description("Nenhuma resposta")
    async atualizarStatus(@PathParams("id") id: number, @BodyParams() pedidoJson: PedidoJson): Promise<void> {
        this.logger.info("Start id={}, pedidoJson={}", id, pedidoJson);
        if(pedidoJson.status === undefined){
            throw new CamposObrigatoriosNaoPreechidoException("Status deve ser informado");
        }
        await this.atualizarStatusPedidoUseCase.atualizarStatus(id, StatusPedidoEnumMapper.stringParaEnum(pedidoJson.status as unknown as string));
        this.logger.trace("End pedidoId={}", id);
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

    @Get('/status/:status')
    async obterPedidosPorStatus(@PathParams("status") status: string): Promise<PedidoJson[]> {
        this.logger.info(`Realizando busca de pedidos: ${status}`);
        const pedidosJson: PedidoJson[] = []
        const pedidos = await this.obterPedidoUseCase.obterPorStatus(status)
        pedidos.forEach(pedido => {
            pedidosJson.push(PedidoJson.getInstance(pedido))
        });
        return pedidosJson;
    }
}