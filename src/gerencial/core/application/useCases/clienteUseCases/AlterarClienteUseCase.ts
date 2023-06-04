import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports/ClienteRepositoryGateway";
import { AlterarCLienteDTO } from "./dtos/AlterarClienteDTO";
import { Cliente } from "src/gerencial/core/domain/Cliente";
import { AlterarCLienteDTOResult } from "./dtos/results/AlterarClienteDTOResult";

export class AlterarClienteUseCase {

    constructor( @Inject() private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async alterar(clienteDTO: AlterarCLienteDTO): Promise<AlterarCLienteDTOResult> {
        const cliente = await this.clienteRepositoryGateway.obterByCpf(clienteDTO.cpf);

        if (!cliente) {
            throw new Error('TODO: Exceptions');
        }

        const clienteAlterado = cliente.set(clienteDTO);

        // TODO: Implementar validações de negócio

        return new AlterarCLienteDTOResult(await this.clienteRepositoryGateway.alterar(clienteAlterado));
    }
}
