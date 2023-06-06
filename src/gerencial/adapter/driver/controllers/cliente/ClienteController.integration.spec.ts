import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../../../../../Server";
import { ClienteController } from "./ClienteController";

describe("ClienteController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server, {
    mount: {
      "/": [ClienteController]
    }
  }));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it.skip("should call GET /cliente", async () => {//TODO: remover skip e implementar test
     const response = await request.get("/cliente").expect(200);

     expect(response.text).toEqual("cliente");
  });
});
