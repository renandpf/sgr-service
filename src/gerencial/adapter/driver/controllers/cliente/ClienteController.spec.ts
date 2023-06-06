import { PlatformTest } from "@tsed/common";
import { ClienteController } from "./ClienteController";

describe("ClienteController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<ClienteController>(ClienteController);
    // const instance = PlatformTest.invoke<ClienteController>(ClienteController); // get fresh instance

    expect(instance).toBeInstanceOf(ClienteController);
  });
});
