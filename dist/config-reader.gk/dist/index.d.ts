import { IFileSystemAdapter } from "@glitchkids-utils/file-system";

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