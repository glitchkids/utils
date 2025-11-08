//#region src/oop/create-composite.ts
function createComposite(name, base) {
	return (mixinsCreate, deps) => {
		const superclass = mixinsCreate.reduce((sc, mixinCreate) => mixinCreate(sc, deps), base);
		return class Composite extends superclass {
			static objType = "composite";
		};
	};
}

//#endregion
//#region src/oop/create-singleton.ts
function createSingleton(name, factory) {
	return (deps) => class extends factory(deps) {
		static objType = "singleton";
		static #instance;
		static getInstance() {
			if (!this.instance) this.#instance = new this();
			return this.#instance;
		}
	};
}

//#endregion
//#region src/oop/create-mixin.ts
function createMixin(name, factory) {
	return (superclass, deps) => class extends factory(superclass, deps) {
		static objType = "mixin";
	};
}

//#endregion
export { createComposite, createMixin, createSingleton };