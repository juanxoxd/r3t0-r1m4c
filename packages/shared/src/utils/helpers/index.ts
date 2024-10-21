export function parserNroDocument(document: string) {
  return parseInt(document).toString();
}

export function toFwSlash(path: string) {
  return path.replace(/\\/g, '/');
}

export function chunkArray<T>(array: T[], size: number) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_v, i) =>
    array.slice(i * size, i * size + size)
  );
}
