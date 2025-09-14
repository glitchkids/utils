import type { IFileSystemAdapter } from "@glitchkids-utils/file-system";
import { createJiti } from "jiti";

class ConfigFileNotfound extends Error {
  name = "ConfigFileNotfound";
  message = "Add glitchkids.config.js/ts at root of project";
}

type TConfigDependencies = { fileSystem: IFileSystemAdapter };
export class ConfigReader {
  #fileSystem: IFileSystemAdapter;
  #config!: Record<string, any>;

  constructor({ fileSystem }: TConfigDependencies) {
    this.#fileSystem = fileSystem;
  }

  async load() {
    const jiti = createJiti(import.meta.url);
    const configFiles = ["glitchkids.config.ts", "glitchkids.config.js"];
    const configFilePath = configFiles.filter((file) =>
      this.#fileSystem.isExists(file)
    );

    if (configFilePath.length === 0) throw new ConfigFileNotfound();
    const configPath = this.#fileSystem.joinPath(
      this.#fileSystem.getProjectBaseRoot(),
      configFilePath[0]
    );

    const config = await jiti.import<any[]>(configPath, {
      default: true,
    });
    this.#config = config;
  }

  getConfig<T>(name: string) {
    return this.#config[name] as T;
  }
  getAllConfig() {
    return this.#config;
  }
}
