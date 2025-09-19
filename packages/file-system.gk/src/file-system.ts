import {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { join, parse } from "node:path";
import fg from "fast-glob";
import watcher from "@parcel/watcher";

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

type TParsePath = {
  dir: string;
  root: string;
  base: string;
  name: string;
  ext: string;
};

type TWriteFileOptions = {
  force: boolean;
};
type TGetWatcherParameters = {
  ignore?: string[];
  root?: string;
  onChange: (event: { type: string; path: string }) => void;
};

export interface IFileSystemAdapter {
  joinPath(...path: string[]): string;
  getProjectBaseRoot(): string;
  writeFile(path: string, content: string, opts?: TWriteFileOptions): void;
  readDirectory(path: string): TDirectory;
  readFile(path: string): string;
  isExists(path: string): boolean;
  glob(options: GlobOptionsParameters): TDirectoryItem[];
  parsePath(path: string): TParsePath;
  getWatcher(
    options: TGetWatcherParameters
  ): ReturnType<typeof watcher.subscribe>;
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

  writeFile(path: string, content: string, opts?: TWriteFileOptions): void {
    if (!opts?.force) {
      writeFileSync(path, content, { encoding: "utf-8" });
      return;
    }

    if (!this.isExists(path))
      mkdirSync(this.parsePath(path).dir, { recursive: true });
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

  getWatcher({
    ignore = [],
    onChange,
    root = "./",
  }: TGetWatcherParameters): ReturnType<typeof watcher.subscribe> {
    return watcher.subscribe(
      root,
      (_, e) =>
        e.forEach((e) => {
          onChange(e);
        }),
      {
        ignore,
      }
    );
  }

  parsePath(path: string): TParsePath {
    return parse(path);
  }
}
