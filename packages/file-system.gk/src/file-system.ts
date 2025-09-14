import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export type TDirectoryItem = {
  path: string;
  isDirectory: boolean;
  name: string;
};
export type TDirectory = TDirectoryItem[];

export interface IFileSystemAdapter {
  joinPath(...path: string[]): string;
  getProjectBaseRoot(): string;
  writeFile(path: string, content: string): void;
  readDirectory(path: string): TDirectory;
  readFile(path: string): string;
  isExists(path: string): boolean;
}

export class FileSystem implements IFileSystemAdapter {
  getProjectBaseRoot(): string {
    return process.cwd();
  }

  isExists(path: string) {
    return existsSync(path);
  }

  joinPath(...path: string[]): string {
    return join(...path);
  }

  readDirectory(path: string): TDirectory {
    return readdirSync(path, { withFileTypes: true }).map((item) => ({
      name: item.name,
      path: this.joinPath(item.parentPath, item.name),
      isDirectory: item.isDirectory(),
    }));
  }

  readFile(path: string): string {
    return readFileSync(path, { encoding: "utf-8" });
  }

  writeFile(path: string, content: string): void {
    writeFileSync(path, content, { encoding: "utf-8" });
  }
}
