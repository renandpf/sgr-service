import { IClienteRepositoryGateway } from "../../../core/application/ports";
import { Cliente } from "../../../core/domain/Cliente";
import { Service } from "@tsed/common";

@Service()
export class ClienteRepositoryGateway implements IClienteRepositoryGateway{
  alterar(cliente: Cliente): Promise<Cliente> {
    return Promise.resolve(null);
  }

  criar(cliente: Cliente): Promise<Cliente> {
    return Promise.resolve(null);
  }

  obterPorCpf(cpf: string): Promise<Cliente | null> {
    return Promise.resolve(null);
  }

  obterPorEmail(email: string): Promise<Cliente | null> {
    return Promise.resolve(null);
  }

  obterPorId(id: number): Promise<Cliente | null> {
    return Promise.resolve(null);
  }

}