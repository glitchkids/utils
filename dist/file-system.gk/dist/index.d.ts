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
interface IFileSystemAdapter {
  joinPath(...path: string[]): string;
  getProjectBaseRoot(): string;
  writeFile(path: string, content: string): void;
  readDirectory(path: string): TDirectory;
  readFile(path: string): string;
  isExists(path: string): boolean;
  glob(options: GlobOptionsParameters): TDirectoryItem[];
  parsePath(path: string): TParsePath;
}
declare class FileSystem implements IFileSystemAdapter {
  getProjectBaseRoot(): string;
  isExists(path: string): boolean;
  joinPath(...path: string[]): string;
  readDirectory(path: string): TDirectory;
  readFile(path: string): string;
  writeFile(path: string, content: string): void;
  glob({
    pattern,
    cwd,
    ignore
  }: GlobOptionsParameters): TDirectoryItem[];
  parsePath(path: string): TParsePath;
}
//#endregion
export { FileSystem, IFileSystemAdapter, TDirectory, TDirectoryItem };