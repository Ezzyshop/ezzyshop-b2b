/* eslint-disable @typescript-eslint/no-explicit-any */
export function removeEmptyStringFields(obj: Record<string, any>): void {
  for (const key in obj) {
    if (obj[key] === "") {
      obj[key] = undefined;
    } else if (Array.isArray(obj[key])) {
      for (let i = 0; i < obj[key].length; i++) {
        if (typeof obj[key][i] === "object" && obj[key][i] !== null) {
          removeEmptyStringFields(obj[key][i]);
          if (isEmptyOrOnlyUndefined(obj[key][i])) {
            obj[key][i] = undefined;
          }
        }
      }
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      removeEmptyStringFields(obj[key]);

      if (isEmptyOrOnlyUndefined(obj[key])) {
        obj[key] = undefined;
      }
    }
  }
}

function isEmptyOrOnlyUndefined(obj: Record<string, any>): boolean {
  const keys = Object.keys(obj);
  if (keys.length === 0) return true;

  return keys.every((key) => obj[key] === undefined);
}
