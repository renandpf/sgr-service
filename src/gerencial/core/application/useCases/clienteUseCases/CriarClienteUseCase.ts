import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { CriarCLienteDTO, CriarClienteDTOResult } from "./dtos";
import { Cliente } from "../../../domain/Cliente";
import { Service } from "@tsed/common";
import { ClienteRepositoryGateway } from "../../../../adapter";

@Service()
export class CriarClienteUseCase {

    constructor( @Inject(ClienteRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async criar(clienteDTO: CriarCLienteDTO): Promise<CriarClienteDTOResult> {
        const cliente = await this.clienteRepositoryGateway.obterPorCpf(clienteDTO.cpf);

        if (cliente) {
            throw new Error('TODO: Exceptions');
        }

        const clienteDomain = new Cliente(-1, clienteDTO.nome, clienteDTO.cpf, clienteDTO.email);

        // TODO: Implementar validações de negócio

        return new CriarClienteDTOResult(await this.clienteRepositoryGateway.criar(clienteDomain));
    }

}