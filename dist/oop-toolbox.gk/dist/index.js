//#region src/create-composite.ts
function createComposite(name, base) {
	return (mixinsCreate, deps) => {
		const superclass = mixinsCreate.reduce((sc, mixinCreate) => mixinCreate(sc, deps), base);
		return class Composite extends factory(superclass, deps) {
			static objType = "composite";
		};
	};
}

//#endregion
//#region src/create-singleton.ts
function createSingleton(name, factory$1) {
	return (deps) => class extends factory$1(deps) {
		static objType = "singleton";
		static #instance;
		static getInstance() {
			if (!this.instance) this.#instance = new this();
			return this.#instance;
		}
	};
}

//#endregion
//#region src/create-mixin.ts
function createMixin(name, factory$1) {
	return (superclass, deps) => class extends factory$1(superclass, deps) {
		static objType = "mixin";
	};
}

//#endregion
export { createComposite, createMixin, createSingleton };