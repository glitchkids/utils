import watcher from "@parcel/watcher";

//#region src/file-system.d.ts
type TDirectoryItem = {
  path: string;
  isDirectory: boolean;
  name: string;
};
type TDirectory = TDirectoryItem[];
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
  onChange: (event: {
    type: string;
    path: string;
  }) => void;
};
interface IFileSystemAdapter {
  joinPath(...path: string[]): string;
  getProjectBaseRoot(): string;
  writeFile(path: string, content: string, opts?: TWriteFileOptions): void;
  readDirectory(path: string): TDirectory;
  readFile(path: string): string;
  isExists(path: string): boolean;
  glob(options: GlobOptionsParameters): TDirectoryItem[];
  parsePath(path: string): TParsePath;
  getWatcher(options: TGetWatcherParameters): ReturnType<typeof watcher.subscribe>;
}
declare class FileSystem implements IFileSystemAdapter {
  getProjectBaseRoot(): string;
  isExists(path: string): boolean;
  joinPath(...path: string[]): string;
  readDirectory(path: string): TDirectory;
  readFile(path: string): string;
  writeFile(path: string, content: string, opts?: TWriteFileOptions): void;
  glob({
    pattern,
    cwd,
    ignore
  }: GlobOptionsParameters): TDirectoryItem[];
  getWatcher({
    ignore,
    onChange,
    root
  }: TGetWatcherParameters): ReturnType<typeof watcher.subscribe>;
  parsePath(path: string): TParsePath;
}
//#endregion
export { FileSystem, IFileSystemAdapter, TDirectory, TDirectoryItem };