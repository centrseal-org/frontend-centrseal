export function truncate(str: string, length = 30, ending = "…"): string {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
}
