import { Produto } from "../../../gerencial/core/domain/Produto";
import { Pedido } from "./Pedido";

export class Item {
    constructor(    
        public readonly pedido?: Pedido,
        public readonly produto?: Produto
    ){}
}