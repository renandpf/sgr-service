import { Produto } from "../../../gerencial/core/domain/Produto";
import { Pedido } from "./Pedido";

export class Item {
    public readonly pedido: Pedido;
    public produto: Produto;
}