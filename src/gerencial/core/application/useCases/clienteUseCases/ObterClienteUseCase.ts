import { Inject, Service } from "@tsed/common";
import { IClienteRepositoryGateway } from "../../ports";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { Cliente } from "../../../domain/Cliente";
import { ClienteNaoEncontradoException } from "../../exception/ClienteNaoEncontradoException";
import { IObterClienteUseCase } from "./IObterClienteUseCase";
import { Logger } from "@tsed/common";
import { ClienteDto } from "../../../dto/cliente/ClienteDto";
import { Optional } from "typescript-optional";

@Service()
export class ObterClienteUseCase implements IObterClienteUseCase {
    constructor( 
        @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway,
        @Inject() private logger: Logger,){}

    async obterPorId(id: number): Promise<ClienteDto> {
        this.logger.trace("Start id={}", id);
        const clienteOp = await this.clienteRepositoryGateway.obterPorId(id);
        const clienteDto = this.getClienteDto(clienteOp);
        this.logger.trace("End clienteDto={}", clienteDto);
        return clienteDto;
    }

    async obterPorCpf(cpf: string): Promise<ClienteDto> {
        this.logger.trace("Start cpf={}", cpf);
        const clienteOp = await this.clienteRepositoryGateway.obterPorCpf(cpf);
        const clienteDto = this.getClienteDto(clienteOp);
        this.logger.trace("End clienteDto={}", clienteDto);
        return clienteDto;
    }

    async obterPorEmail(email: string): Promise<ClienteDto> {
        this.logger.trace("Start email={}", email);
        const clienteOp = await this.clienteRepositoryGateway.obterPorEmail(email);
        const clienteDto = this.getClienteDto(clienteOp);
        this.logger.trace("End clienteDto={}", clienteDto);
        return clienteDto;
    }

    private getClienteDto(clienteOp: Optional<ClienteDto>): ClienteDto {
        if (clienteOp.isEmpty()) {
            this.logger.warn("Cliente não encontrado");
            throw new ClienteNaoEncontradoException();
        }

        return clienteOp.get();
    }

}