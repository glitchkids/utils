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
  it("watch", async () => {
    const watcher = await fileSystem.getWatcher({
      onChange(event) {
        console.log(event);
      },
      ignore: ["!**/**.json"],
    });

    return await new Promise((resolve) => {
      setTimeout(() => {
        watcher.unsubscribe();
        resolve();
      }, 20000);
    });
  });
});
