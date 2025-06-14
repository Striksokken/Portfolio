import "../src";

export async function setupOpenCv() {
  const _cv = await require("../dist/opencv.js");
  global.cv = _cv;
}

export function translateException(err: any) {
  if (typeof err === "number") {
    try {
      const exception = cv.exceptionFromPtr(err);
      return exception;
    } catch (error) {
      // ignore
    }
  }
  return err;
}
