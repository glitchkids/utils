export function createMixin<Dependencies, Base, Interface>(
  name: string,
  factory: (
    supperclass: { new (...args: ConstructorParameters<typeof Base>): Base },
    deps: Dependencies,
  ) => { new (...args: any[]): I & B },
) {
  return (superclass: typeof Base, deps: Dependencies) =>
    class extends factory(superclass, deps) {
      static objType: 'mixin' = 'mixin';
    } as { new (...args: any[]): Interface & Base };
}
