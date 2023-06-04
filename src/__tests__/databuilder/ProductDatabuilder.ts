import * as factory from "factory.ts";

import faker from "faker";
import { Categoria } from "../../gerencial/core/domain/Categoria";
import { Produto } from "../../gerencial/core/domain/Produto";

export const anyProduto = factory.Sync.makeFactory<Produto>({
    id: faker.datatype.number(),
    valor: faker.datatype.number(),
    nome: faker.random.alpha(),
    categoria: Categoria.ACOMPANHAMENTO,
});