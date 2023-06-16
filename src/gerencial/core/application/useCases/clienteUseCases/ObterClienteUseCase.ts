import { Inject, Service } from "@tsed/common";
import { IClienteRepositoryGateway } from "../../ports";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { Cliente } from "../../../domain";
import { ClienteNaoEncontradoException } from "../../exception/ClienteNaoEncontradoException";

@Service()
export class ObterClienteUseCase {
    constructor( @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async obterPorId(id: number): Promise<Cliente> {
        const clienteOp = await this.clienteRepositoryGateway.obterPorId(id);
        if(clienteOp.isEmpty()) {
            throw new ClienteNaoEncontradoException();
        }
        return clienteOp.get();
    }
    async obterPorCpf(cpf: string): Promise<Cliente> {
        const clienteOp = await this.clienteRepositoryGateway.obterPorCpf(cpf);
        if(clienteOp.isEmpty()) {
            throw new ClienteNaoEncontradoException();
        }
        return clienteOp.get();
    }
    async obterPorEmail(email: string): Promise<Cliente> {
        const clienteOp = await this.clienteRepositoryGateway.obterPorEmail(email);
        if(clienteOp.isEmpty()) {
            throw new ClienteNaoEncontradoException();
        }
        return clienteOp.get();
    }
}