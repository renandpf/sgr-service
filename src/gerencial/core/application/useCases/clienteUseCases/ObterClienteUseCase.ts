import { Inject, Service } from "@tsed/common";
import { IClienteRepositoryGateway } from "../../ports";
import { ObterCLienteDTOResult } from "./dtos";
import { Cliente } from "../../../domain";
import { ClienteRepositoryGateway } from "../../../../adapter";

@Service()
export class ObterClienteUseCase {
    constructor( @Inject(ClienteRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async obterById(id: number): Promise<ObterCLienteDTOResult> {
        const cliente: Cliente = await this.clienteRepositoryGateway.obterPorId(id);
        return new ObterCLienteDTOResult(cliente);
    }
    async obterPorCpf(cpf: string): Promise<ObterCLienteDTOResult> {
        const cliente = await this.clienteRepositoryGateway.obterPorCpf(cpf);
        if(!cliente) {
            throw new Error("TODO: Exceptions");
        }
        return new ObterCLienteDTOResult(cliente);
    }
    async obterByEmail(email: string): Promise<ObterCLienteDTOResult> {
        const cliente = await this.clienteRepositoryGateway.obterPorEmail(email);
        return new ObterCLienteDTOResult(cliente);
    }
}