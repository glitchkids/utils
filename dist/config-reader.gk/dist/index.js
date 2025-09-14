import { createJiti } from "jiti";

//#region src/config-reader.ts
var ConfigFileNotfound = class extends Error {
	name = "ConfigFileNotfound";
	message = "Add glitchkids.config.js/ts at root of project";
};
var ConfigReader = class {
	#fileSystem;
	#config;
	constructor({ fileSystem }) {
		this.#fileSystem = fileSystem;
	}
	async load() {
		const jiti = createJiti(import.meta.url);
		const configFilePath = ["glitchkids.config.ts", "glitchkids.config.js"].filter((file) => this.#fileSystem.isExists(file));
		if (configFilePath.length === 0) throw new ConfigFileNotfound();
		const configPath = this.#fileSystem.joinPath(this.#fileSystem.getProjectBaseRoot(), configFilePath[0]);
		this.#config = await jiti.import(configPath, { default: true });
	}
	getConfig(name) {
		return this.#config[name];
	}
	getAllConfig() {
		return this.#config;
	}
};

//#endregion
export { ConfigReader };