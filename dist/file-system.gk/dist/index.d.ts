//#region src/file-system.d.ts
type TDirectoryItem = {
  path: string;
  isDirectory: boolean;
  name: string;
};
type TDirectory = TDirectoryItem[];
interface IFileSystemAdapter {
  joinPath(...path: string[]): string;
  getProjectBaseRoot(): string;
  writeFile(path: string, content: string): void;
  readDirectory(path: string): TDirectory;
  readFile(path: string): string;
  isExists(path: string): boolean;
}
declare class FileSystem implements IFileSystemAdapter {
  getProjectBaseRoot(): string;
  isExists(path: string): boolean;
  joinPath(...path: string[]): string;
  readDirectory(path: string): TDirectory;
  readFile(path: string): string;
  writeFile(path: string, content: string): void;
}
//#endregion
export { FileSystem, IFileSystemAdapter, TDirectory, TDirectoryItem };