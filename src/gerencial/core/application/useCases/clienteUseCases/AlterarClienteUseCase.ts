import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { Service } from "@tsed/common";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { Cliente } from "../../../domain";
import { Optional } from "typescript-optional";
import { ClienteNaoEncontradoException } from "../../exception/ClienteNaoEncontradoException";

@Service()
export class AlterarClienteUseCase {

    constructor( @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async alterar(clienteReq: Cliente): Promise<Cliente> {

        clienteReq.validar();

        const clienteOp: Optional<Cliente> = await this.clienteRepositoryGateway.obterPorCpf(<string>clienteReq.cpf);
        
        if (clienteOp.isEmpty()) {
            throw new ClienteNaoEncontradoException();
        }
        
        const clienteAlterado = clienteOp.get().set(clienteReq);

        return await this.clienteRepositoryGateway.alterar(clienteAlterado);
    }
}
