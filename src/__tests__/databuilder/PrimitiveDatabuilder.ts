import * as factory from "factory.ts";
import { faker } from '@faker-js/faker';

export const anyNumber = factory.Sync.makeFactory<number>(faker.number.int());
