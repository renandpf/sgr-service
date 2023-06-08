import { Controller } from "@tsed/di";
import { Get, Post, Returns } from "@tsed/schema";
import { BodyParams, Inject, QueryParams } from "@tsed/common";
import { CriarClienteUseCase, ObterClienteUseCase } from "../../../../core/application";
import { ClienteJson } from "./json/ClienteJson";

@Controller("/cliente")
export class ClienteController {

    constructor(
        @Inject() private obterClienteUseCase: ObterClienteUseCase,
        @Inject() private criarClienteUseCase: CriarClienteUseCase
    ) {
    }
    @Get("/")
    @Returns(200, ClienteJson)
    @Returns(404).Description("Not found")
    async obterPorCpf(@QueryParams("cpf") cpf: string) {
        const cliente = await this.obterClienteUseCase.obterPorCpf(cpf);
        return new ClienteJson(cliente);
    }

    @Post("/")
    @Returns(200, ClienteJson)
    @Returns(404).Description("Not found")
    async criarCliente(@BodyParams() cliente: ClienteJson){
        return await this.criarClienteUseCase.criar(cliente.getDomain());
    }

}