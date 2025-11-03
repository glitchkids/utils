export function createComposite<Mixins extends any[], MixinsType, Base>(
  name: string,
  base: typeof B,
) {
  return (mixinsCreate: Mixins, deps: any) => {
    const superclass = mixinsCreate.reduce(
      (sc, mixinCreate) => mixinCreate(sc, deps),
      base,
    );

    return class Composite extends factory(superclass, deps) {
      static objType: 'composite' = 'composite';
    } as { new (...args: any[]): Base & MixinsType };
  };
}
