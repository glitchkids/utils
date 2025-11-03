export type FunctionOutput<OK, KO> =
  | { status: "ok"; data: OK }
  | { status: "ko"; error: KO };
