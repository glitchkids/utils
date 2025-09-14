import { test } from "node:test";
import { ConfigReader } from "./config-reader";

test("Hello World", async () => {
  const configReader = new ConfigReader();

  await configReader.load();
});
