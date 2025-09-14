import { FileSystem } from "@glitchkids-adapters/file-system";
import { ConfigReader } from "@glitchkids-adapters/config-reader";

(async () => {
  const fileSystem = new FileSystem();
  const configReader = new ConfigReader({ fileSystem });

  await configReader.load();
})();
