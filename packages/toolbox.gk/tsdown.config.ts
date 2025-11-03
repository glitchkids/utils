import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: "./src/oop/index.ts",
    outDir: "./dist/oop",
    dts: true,
  },
  {
    entry: "./src/types/index.ts",
    outDir: "./dist/types",
    dts: true,
  },
]);
