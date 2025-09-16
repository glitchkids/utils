import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import fg from "fast-glob";

export type TDirectoryItem = {
  path: string;
  isDirectory: boolean;
  name: string;
};
export type TDirectory = TDirectoryItem[];
type GlobOptionsParameters = {
  pattern: string[];
  cwd?: string;
  ignore?: string[];
};

export interface IFileSystemAdapter {
  joinPath(...path: string[]): string;
  getProjectBaseRoot(): string;
  writeFile(path: string, content: string): void;
  readDirectory(path: string): TDirectory;
  readFile(path: string): string;
  isExists(path: string): boolean;
  glob(options: GlobOptionsParameters): TDirectoryItem[];
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

  glob({
    pattern = [],
    cwd = this.getProjectBaseRoot(),
    ignore = [],
  }: GlobOptionsParameters): TDirectoryItem[] {
    return fg
      .sync(pattern, {
        ignore,
        cwd,
        objectMode: true,
      })
      .map((f) => ({
        name: f.name,
        path: f.path,
        isDirectory: f.dirent.isDirectory(),
      }));
  }
}
