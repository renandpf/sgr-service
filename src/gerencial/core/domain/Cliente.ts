import { Usuario, Pedido } from "src/pedido";

export class Cliente {
    constructor(
        readonly id?: number,
        readonly nome?: string,
        readonly cpf?: string,
        readonly email?: string,
        readonly usuario?: Usuario,
        readonly pedidos?: Pedido[],

    ){}

    set(clienteAlt: Cliente) {
        return new Cliente(this.id, clienteAlt.nome, this.cpf, clienteAlt.email, clienteAlt.usuario, clienteAlt.pedidos);
    }
}