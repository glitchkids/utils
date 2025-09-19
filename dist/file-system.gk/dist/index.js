import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, parse } from "node:path";
import fg from "fast-glob";
import watcher from "@parcel/watcher";

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
	writeFile(path, content, opts) {
		if (!opts?.force) {
			writeFileSync(path, content, { encoding: "utf-8" });
			return;
		}
		if (!this.isExists(path)) mkdirSync(this.parsePath(path).dir, { recursive: true });
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
	getWatcher({ ignore = [], onChange, root = "./" }) {
		return watcher.subscribe(root, (_, e) => e.forEach((e$1) => {
			onChange(e$1);
		}), { ignore });
	}
	parsePath(path) {
		return parse(path);
	}
};

//#endregion
export { FileSystem };