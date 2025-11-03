//#region src/oop/create-composite.d.ts
declare function createComposite<Mixins extends any[], MixinsType, Base>(name: string, base: typeof B): (mixinsCreate: Mixins, deps: any) => {
  new (...args: any[]): Base & MixinsType;
};
//#endregion
//#region src/oop/create-singleton.d.ts
declare function createSingleton<D, I>(name: string, factory: (deps: D) => {
  new (...args: any[]): I;
}): (deps: D) => {
  new (...args: any[]): {};
  objType: "singleton";
  "#instance": I;
  getInstance(): I;
};
//#endregion
//#region src/oop/create-mixin.d.ts
declare function createMixin<Dependencies, Base, Interface>(name: string, factory: (supperclass: {
  new (...args: ConstructorParameters<typeof Base>): Base;
}, deps: Dependencies) => {
  new (...args: any[]): I & B;
}): (superclass: typeof Base, deps: Dependencies) => {
  new (...args: any[]): Interface & Base;
};
//#endregion
//#region src/oop/utility-types.d.ts
type UExtractConstructor<T> = ReturnType<ReturnType<T>>;
type UExtractCreate<T> = ReturnType<T>;
//#endregion
export { UExtractConstructor, UExtractCreate, createComposite, createMixin, createSingleton };