import { Controller } from "@tsed/di";
import { Logger } from "@tsed/common";
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
import { AlterarClienteParamsDto } from "../../../../core/dto/cliente/flows/AlterarClienteParamsDto";
import { CriarClienteParamsDto } from "../../../../core/dto/cliente/flows/CriarClienteParamsDto";

@Controller("/clientes")
export class ClienteController {

    constructor(
        @Inject(ObterClienteUseCase) private obterClienteUseCase: IObterClienteUseCase,
        @Inject(CriarClienteUseCase) private criarClienteUseCase: ICriarClienteUseCase,
        @Inject(AlterarClienteUseCase) private alterarClienteUseCase: IAlterarClienteUseCase,
        @Inject() private logger: Logger,
    ) {
    }
    @Get("/cpf/:cpf")
    @Returns(200, ClienteJson)
    @Returns(404).Description("Not found")
    async obterPorCpf(@PathParams("cpf") cpf: string) {
        this.logger.trace("Start cpf={}", cpf);
        const cliente = await this.obterClienteUseCase.obterPorCpf(cpf);
        const clientJson = new ClienteJson(cliente);
        this.logger.trace("End clientJson={}", clientJson);
        return clientJson;
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
    async criarCliente(@BodyParams() cliente: ClienteJson): Promise<void> {
        this.logger.trace("Start cliente={}", cliente);
        const returnDto = await this.criarClienteUseCase.criar(new CriarClienteParamsDto(cliente.getDto()));
        this.logger.trace("End clienteId={}", returnDto.clienteId);
    }

    @Put("/:id")
    @Returns(200, ClienteJson)
    @Returns(404).Description("Not found")
    async alterarCliente(@BodyParams() cliente: ClienteJson, @PathParams("id") id: number){
        this.logger.trace("Start cliente={}, id={}", cliente, id);
        await this.alterarClienteUseCase.alterar(new AlterarClienteParamsDto(cliente.getDto(id)));
        this.logger.trace("End");
    }

}