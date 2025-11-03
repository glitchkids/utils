//#region src/types/index.d.ts
type FunctionOutput<OK, KO> = {
  status: "ok";
  data: OK;
} | {
  status: "ko";
  error: KO;
};
//#endregion
export { FunctionOutput };