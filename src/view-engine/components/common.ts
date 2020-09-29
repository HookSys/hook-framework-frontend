export function bindPathParams(
  pathParams: object,
  path: string
): string {
  if (!pathParams) {
    return path
  }
  return Object.keys(pathParams).reduce((result, key) => {
    return result.replace(`{${key}}`, pathParams[key])
  }, path)
}
