type Mapper = {
  from: <T>(json: unknown) => T;
  to: <T>(value: T) => unknown;
};

interface Options {
  parent?: Mapper;
  properties: {
    names: Record<string, string>;
    baseNames: Record<string, string>;
    required: Set<string>;
    nullable: Set<string>;
    date: Set<string>;
    dateTime: Set<string>;
    listContainer: Record<string, Mapper>;
    mapContainer: Record<string, Mapper>;
    map: Record<string, Mapper>;
  };
}

function isObject(json: unknown): json is Record<string, unknown> {
  return json instanceof Object;
}

export function parseGenericModelJson<T extends {} | undefined | null>(
  json: unknown,
  { parent, properties }: Options,
): T {
  if (!isObject(json)) {
    return json as T;
  }

  for (const baseName of properties.required) {
    if (json[baseName] === undefined) {
      throw new Error(`"${baseName}" is required`);
    }
  }

  const keys: string[] = Object.keys(json);

  const out = keys.reduce((obj, baseName) => {
    const v: unknown = json[baseName];
    const name: string = properties.names[baseName] ?? baseName;

    if (v === null) {
      if (!properties.nullable.has(baseName)) {
        throw new Error(`"${baseName}" is not nullable`);
      } else {
        obj[name] = null;
      }
    } else if (typeof v === 'string') {
      obj[name] =
        properties.date.has(baseName) || properties.dateTime.has(baseName)
          ? new Date(v)
          : v;
    } else if (
      Array.isArray(v) &&
      typeof properties.listContainer[baseName]?.from === 'function'
    ) {
      obj[name] = v.map((jsonValue) =>
        properties.listContainer[baseName].from(jsonValue),
      );
    } else if (
      v instanceof Object &&
      typeof properties.mapContainer[baseName]?.from === 'function'
    ) {
      obj[name] = Object.keys(v).reduce((next, key) => {
        //@ts-ignore
        next[key] = properties.mapContainer[baseName].from(v[key]);
        return next;
      }, {} as Record<string, unknown>);
    } else if (typeof properties.map[baseName]?.from === 'function') {
      obj[name] = properties.map[baseName].from(v);
    } else {
      obj[name] = v;
    }

    return obj;
  }, {} as Record<string, unknown>) as T;

  return typeof parent?.from === 'function'
    ? {
        ...parent.from(json),
        ...out,
      }
    : out;
}

export function jsonifyGenericModel<T extends {} | undefined | null>(
  value: T,
  { parent, properties }: Options,
): object | undefined | null {
  if (!isObject(value)) {
    return value as T;
  }

  for (const name of properties.required) {
    const baseName: string | undefined = properties.baseNames[name];
    if (
      typeof baseName === 'string' &&
      (value as Record<string, unknown>)[baseName] === undefined
    ) {
      throw new Error(`"${baseName}" is required`);
    }
  }

  const keys: string[] = Object.keys(value);

  const out = keys.reduce((obj, name) => {
    const v: unknown = (value as Record<string, unknown>)[name];
    const baseName: string = properties.baseNames[name] ?? name;

    if (v === null) {
      if (!properties.nullable.has(baseName)) {
        throw new Error(`"${baseName}" is not nullable`);
      } else {
        obj[baseName] = null;
      }
    } else if (v instanceof Date) {
      if (properties.date.has(baseName)) {
        obj[baseName] = v.toISOString().substr(0, 10);
      } else if (properties.dateTime.has(baseName)) {
        obj[baseName] = v.toDateString();
      } else {
        obj[baseName] = v;
      }
    } else if (
      Array.isArray(v) &&
      typeof properties.listContainer[baseName]?.to === 'function'
    ) {
      obj[baseName] = v.map((item) =>
        properties.listContainer[baseName].to(item),
      );
    } else if (
      v instanceof Object &&
      typeof properties.mapContainer[baseName]?.to === 'function'
    ) {
      obj[baseName] = Object.keys(v).reduce((next, key) => {
        //@ts-ignore
        next[key] = properties.mapContainer[baseName].to(v[key]);
        return next;
      }, {} as Record<string, unknown>);
    } else if (typeof properties.map[baseName]?.to === 'function') {
      obj[baseName] = properties.map[baseName].to(v);
    } else {
      obj[baseName] = v;
    }
    return obj;
  }, {} as Record<string, unknown>) as object;

  if (typeof parent?.to === 'function') {
    const parentValue = parent.to(value);
    return parentValue instanceof Object ? { ...parentValue, ...out } : out;
  } else {
    return out;
  }
}
