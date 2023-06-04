import { Inject } from "@tsed/common";
import { IClienteRepositoryGateway } from "../../ports/ClienteRepositoryGateway";
import { Cliente } from "src/gerencial/core/domain/Cliente";
import { ObterCLienteDTOResult } from "./dtos/results/ObterClienteDTOResult";
import { CLienteDTOResult } from "./dtos/results/ClienteDTOResult";

export class ObterClienteUseCase {

    constructor( @Inject() private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async obterById(id: number): Promise<ObterCLienteDTOResult> {
        const cliente = await this.clienteRepositoryGateway.obterById(id);
        const result = new CLienteDTOResult(cliente);
        return result;
    }
    async obterByCpf(cpf: string): Promise<ObterCLienteDTOResult> {
        const cliente = await this.clienteRepositoryGateway.obterByCpf(cpf);
        const result = new CLienteDTOResult(cliente);
        return result;
    }
    async obterByEmail(email: string): Promise<ObterCLienteDTOResult> {
        const cliente = await this.clienteRepositoryGateway.obterByEmail(email);
        const result = new CLienteDTOResult(cliente);
        return result;
    }

}