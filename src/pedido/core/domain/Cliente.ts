import { Pedido } from "./Pedido";
import { Usuario } from "./Usuario";

export class Cliente {
    public readonly usuario?: Usuario;
    public readonly pedidos: Pedido[];
}