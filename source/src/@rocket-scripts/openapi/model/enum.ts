interface Options {
  enumVars: Set<string>;
}

export function parseEnumModelJson<T extends string | null | undefined>(
  json: unknown,
  { enumVars }: Options,
): T {
  if (typeof json !== 'string' || enumVars.has(json)) {
    return undefined as T;
  }

  return json as T;
}
