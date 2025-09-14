import { IFileSystemAdapter } from "@glithkids-adapters/file-system";

//#region src/config-reader.d.ts
type TConfigDependencies = {
  fileSystem: IFileSystemAdapter;
};
declare class ConfigReader {
  #private;
  constructor({
    fileSystem
  }: TConfigDependencies);
  load(): Promise<void>;
  getConfig<T>(name: string): T;
  getAllConfig(): Record<string, any>;
}
//#endregion
export { ConfigReader };