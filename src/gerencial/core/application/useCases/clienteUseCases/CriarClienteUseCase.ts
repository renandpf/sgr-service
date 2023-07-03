import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { Cliente } from "../../../domain/Cliente";
import { Service } from "@tsed/common";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { Optional } from "typescript-optional";
import { ClienteExistenteException } from "../../exception/ClienteExistenteException";
import { ICriarClienteUseCase } from "./ICriarClienteUseCase";

@Service()
export class CriarClienteUseCase implements ICriarClienteUseCase {

    constructor( @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async criar(clienteReq: Cliente): Promise<Cliente> {

        clienteReq.validar();

        const clienteOp: Optional<Cliente> = await this.clienteRepositoryGateway.obterPorCpf(<string>clienteReq.cpf);

        if (!clienteOp.isEmpty()) {
            throw new ClienteExistenteException();
        }

        return await this.clienteRepositoryGateway.criar(clienteReq);
    }

}