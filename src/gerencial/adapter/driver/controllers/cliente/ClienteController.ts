import { Controller } from "@tsed/di";
import { Get, Post, Put, Returns } from "@tsed/schema";
import { BodyParams, Inject, PathParams } from "@tsed/common";
import { 
    AlterarClienteUseCase, 
    CriarClienteUseCase, 
    IAlterarClienteUseCase, 
    ICriarClienteUseCase, 
    IObterClienteUseCase, 
    ObterClienteUseCase } from "../../../../core/application/useCases/clienteUseCases";
import { ClienteJson } from "./json/ClienteJson";

@Controller("/clientes")
export class ClienteController {

    constructor(
        @Inject(ObterClienteUseCase) private obterClienteUseCase: IObterClienteUseCase,
        @Inject(CriarClienteUseCase) private criarClienteUseCase: ICriarClienteUseCase,
        @Inject(AlterarClienteUseCase) private alterarClienteUseCase: IAlterarClienteUseCase
    ) {
    }
    @Get("/cpf/:cpf")
    @Returns(200, ClienteJson)
    @Returns(404).Description("Not found")
    async obterPorCpf(@PathParams("cpf") cpf: string) {
        const cliente = await this.obterClienteUseCase.obterPorCpf(cpf);

        return new ClienteJson(cliente);
    }

    @Get("/email/:email")
    @Returns(200, ClienteJson)
    @Returns(404).Description("Not found")
    async obterPorEmail(@PathParams("email") email: string) {
        const cliente = await this.obterClienteUseCase.obterPorEmail(email);

        return new ClienteJson(cliente);
    }

    @Get("/:id")
    @Returns(200, ClienteJson)
    @Returns(404).Description("Not found")
    async obterPorId(@PathParams("id") id: number) {
        const cliente = await this.obterClienteUseCase.obterPorId(id);
        return new ClienteJson(cliente);
    }

    @Post("/")
    @Returns(201, ClienteJson)
    @Returns(404).Description("Not found")
    async criarCliente(@BodyParams() cliente: ClienteJson){
        return await this.criarClienteUseCase.criar(cliente.getDomain());
    }

    @Put("/:id")
    @Returns(200, ClienteJson)
    @Returns(404).Description("Not found")
    async alterarCliente(@BodyParams() cliente: ClienteJson, @PathParams("id") id: number){
        return await this.alterarClienteUseCase.alterar(cliente.getDomain(id));
    }

}