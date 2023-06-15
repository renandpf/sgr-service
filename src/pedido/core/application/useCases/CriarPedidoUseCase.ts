import { Service } from "@tsed/common";
import { Pedido } from "../../domain/Pedido";

@Service()
export class CriarPedidoUseCase {
    
    public criar(pedido: Pedido): Promise<number> {
        //TODO: implementar
        return Promise.resolve(15);
    }

}