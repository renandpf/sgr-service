import { Cliente } from "src/gerencial";
import { Item } from "./Item";
import { StatusPedido } from "./StatusPedido";

export class Pedido {
    public readonly status: StatusPedido;
    public readonly itens: Item[];
    public readonly cliente: Cliente;
    //public readonly pagamentos: Pagamento[]; //TODO: deve importar do "pagamento" ou deve haver uma classe aqui ?
}