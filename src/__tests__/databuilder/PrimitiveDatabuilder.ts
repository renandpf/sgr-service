import * as factory from "factory.ts";

import faker from "faker";

export const anyNumber = factory.Sync.makeFactory<number>(faker.datatype.number());
