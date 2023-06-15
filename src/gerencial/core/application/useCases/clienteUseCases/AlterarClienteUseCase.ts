import { Inject } from "@tsed/di";
import { IClienteRepositoryGateway } from "../../ports";
import { Service } from "@tsed/common";
import { ClienteMySqlRepositoryGateway } from "../../../../adapter";
import { Cliente } from "../../../domain";
import { Optional } from "typescript-optional";

@Service()
export class AlterarClienteUseCase {

    constructor( @Inject(ClienteMySqlRepositoryGateway) private clienteRepositoryGateway: IClienteRepositoryGateway ){}
    async alterar(clienteReq: Cliente): Promise<Cliente> {

        let clienteOp: Optional<Cliente> = Optional.empty();
        if(clienteReq.cpf !== undefined){
            clienteOp = await this.clienteRepositoryGateway.obterPorCpf(clienteReq.cpf);
        }
        
        if (clienteOp.isEmpty()) {
            throw new Error('TODO: Exceptions');
        }
        
        const clienteAlterado = clienteOp.get().set(clienteReq);

        // TODO: Implementar validações de negócio

        return await this.clienteRepositoryGateway.alterar(clienteAlterado);
    }
}
