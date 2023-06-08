import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { Service } from "@tsed/common";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { Cliente } from "../../../domain";

@Service()
export class AlterarClienteUseCase {

    constructor( @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async alterar(clienteReq: Cliente): Promise<Cliente> {
        const clienteOp = await this.clienteRepositoryGateway.obterPorCpf(clienteReq.cpf);

        if (clienteOp.isEmpty()) {
            throw new Error('TODO: Exceptions');
        }

        const clienteAlterado = clienteOp.get().set(clienteReq);

        // TODO: Implementar validações de negócio

        return await this.clienteRepositoryGateway.alterar(clienteAlterado);
    }
}
