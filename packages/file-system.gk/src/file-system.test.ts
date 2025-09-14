import { FileSystem } from "./file-system";
import { describe, it } from "node:test";

const fileSystem = new FileSystem();

describe("file-system.gk", () => {
  it("getProjectBaseRoot", () => {
    const cwd = fileSystem.getProjectBaseRoot();
    console.log(cwd);
  });

  it("readDirectory", () => {
    console.log(fileSystem.readDirectory(fileSystem.getProjectBaseRoot()));
  });
});
