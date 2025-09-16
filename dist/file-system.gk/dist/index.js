import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import fg from "fast-glob";

//#region src/file-system.ts
var FileSystem = class {
	getProjectBaseRoot() {
		return process.cwd();
	}
	isExists(path) {
		return existsSync(path);
	}
	joinPath(...path) {
		return join(...path);
	}
	readDirectory(path) {
		return readdirSync(path, { withFileTypes: true }).map((item) => ({
			name: item.name,
			path: this.joinPath(item.parentPath, item.name),
			isDirectory: item.isDirectory()
		}));
	}
	readFile(path) {
		return readFileSync(path, { encoding: "utf-8" });
	}
	writeFile(path, content) {
		writeFileSync(path, content, { encoding: "utf-8" });
	}
	glob({ pattern = [], cwd = this.getProjectBaseRoot(), ignore = [] }) {
		return fg.sync(pattern, {
			ignore,
			cwd,
			objectMode: true
		}).map((f) => ({
			name: f.name,
			path: f.path,
			isDirectory: f.dirent.isDirectory()
		}));
	}
};

//#endregion
export { FileSystem };