import { PlatformTest } from "@tsed/common";
import { MysqlDatasource } from "./MysqlDatasource";

describe("MysqlDatasource", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<MysqlDatasource>(MysqlDatasource);
    // const instance = PlatformTest.invoke<MysqlDatasource>(MysqlDatasource); // get fresh instance

    expect(instance).toBeInstanceOf(MysqlDatasource);
  });
});
