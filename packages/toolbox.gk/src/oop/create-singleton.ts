export function createSingleton<D, I>(
  name: string,
  factory: (deps: D) => { new (...args: any[]): I },
) {
  return (deps: D) =>
    class extends factory(deps) {
      static objType: 'singleton' = 'singleton';
      static #instance: I;
      static getInstance() {
        if (!this.instance) {
          this.#instance = new this();
        }
        return this.#instance;
      }
    };
}
