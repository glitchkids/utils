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
  it("glob", () => {
    console.log(fileSystem.glob({ pattern: ["**/**.test.ts"] }));
  });
  it("writeFile force", () => {
    fileSystem.writeFile("tests/file.txt", "Yo", { force: true });
  });
});
