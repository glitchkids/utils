export function createComposite<CreateMixins extends any[], MixinsType, Base>(
  name: string,
  base: typeof Base
) {
  return (
    mixinsCreate: CreateMixins,
    deps: Parameters<CreateMixins[number]>[1]
  ) => {
    const superclass = mixinsCreate.reduce(
      (sc, mixinCreate) => mixinCreate(sc, deps),
      base
    );

    return class Composite extends superclass {
      static objType: "composite" = "composite";
    } as { new (...args: any[]): Base & MixinsType };
  };
}
