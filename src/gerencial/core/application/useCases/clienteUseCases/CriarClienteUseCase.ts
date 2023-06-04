import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports/ClienteRepositoryGateway";
import { CriarCLienteDTO } from "./dtos/CriarClienteDTO";
import { CriarClienteDTOResult } from "./dtos/results/CriarClienteDTOResult";
import { Cliente } from "src/gerencial/core/domain/Cliente";

export class CriarClienteUseCase {

    constructor( @Inject() private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async criar(clienteDTO: CriarCLienteDTO): Promise<CriarClienteDTOResult> {
        const cliente = await this.clienteRepositoryGateway.obterByCpf(clienteDTO.cpf);

        if (cliente) {
            throw new Error('TODO: Exceptions');
        }

        const clienteDomain = new Cliente(-1, clienteDTO.nome, clienteDTO.cpf, clienteDTO.email);

        // TODO: Implementar validações de negócio

        return new CriarClienteDTOResult(await this.clienteRepositoryGateway.criar(clienteDomain));
    }

}