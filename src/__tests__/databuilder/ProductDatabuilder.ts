import * as factory from "factory.ts";
import { faker } from "@faker-js/faker";
import { CategoriaEnum, Produto } from "../../gerencial";

export const anyProduto = factory.Sync.makeFactory<Produto>({
    id: faker.number.int(),
    valor: faker.number.float(),
    nome: faker.string.alpha(),
    categoria: CategoriaEnum.ACOMPANHAMENTO,
    validar: () => "",
});