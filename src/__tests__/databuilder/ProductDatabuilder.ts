import * as factory from "factory.ts";

import faker from "faker";
import { Categoria } from "../../gerencial/core/domain/Categoria";
import { Produto } from "../../gerencial/core/domain/Produto";

export const anyProduto = factory.Sync.makeFactory<Produto>({
    id: 15,
    valor: 55,
    nome: faker.random.alpha(),
    categoria: Categoria.ACOMPANHAMENTO,
});