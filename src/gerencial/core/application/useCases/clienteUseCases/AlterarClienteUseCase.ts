import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { AlterarCLienteDTO, AlterarCLienteDTOResult } from "./dtos";
import { Service } from "@tsed/common";
import { ClienteRepositoryGateway } from "../../../../adapter";

@Service()
export class AlterarClienteUseCase {

    constructor( @Inject(ClienteRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async alterar(clienteDTO: AlterarCLienteDTO): Promise<AlterarCLienteDTOResult> {
        const cliente = await this.clienteRepositoryGateway.obterPorCpf(clienteDTO.cpf);

        if (!cliente) {
            throw new Error('TODO: Exceptions');
        }

        const clienteAlterado = cliente.set(clienteDTO);

        // TODO: Implementar validações de negócio

        return new AlterarCLienteDTOResult(await this.clienteRepositoryGateway.alterar(clienteAlterado));
    }
}
