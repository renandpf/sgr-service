import { Usuario, Pedido } from "../../../pedido";
import { ClienteValidacaoException } from "../application/exception/ClienteValidacaoException";
import { ClienteDto } from "../dto/cliente/ClienteDto";

export class Cliente {
    constructor(
        readonly id?: number,
        readonly nome?: string,
        readonly cpf?: string,
        readonly email?: string,
        readonly usuario?: Usuario,
        readonly pedidos?: Pedido[],

    ) { }
    set(clienteAlt: Cliente) {
        return new Cliente(this.id, clienteAlt.nome, this.cpf, clienteAlt.email, clienteAlt.usuario, clienteAlt.pedidos);
    }

    validar() {
        if (!this.cpf) {
            throw new ClienteValidacaoException("CPF é obrigatório");
        }
    }

    toClienteDto(): ClienteDto{
        return new ClienteDto(
          this.id,
          this.nome,
          this.cpf,
          this.email
        );
    }
}