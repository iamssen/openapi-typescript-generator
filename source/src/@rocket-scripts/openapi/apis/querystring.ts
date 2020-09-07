export type UrlQueryInput = {
  [key: string]:
    | string
    | number
    | null
    | boolean
    | (string | number | null | boolean)[]
    | UrlQueryInput;
};

export type QuerystringStringify = (
  input: UrlQueryInput,
  prefix?: string,
) => string;

export function querystring(input: UrlQueryInput, prefix: string = ''): string {
  return Object.keys(input)
    .map((key) => {
      const fullKey = prefix + (prefix.length ? `[${key}]` : key);
      const value = input[key];

      if (Array.isArray(value)) {
        const multiValue = value
          .map((v) => encodeURIComponent(String(v)))
          .join(`&${encodeURIComponent(fullKey)}=`);
        return `${encodeURIComponent(fullKey)}=${multiValue}`;
      } else if (value instanceof Object) {
        return querystring(value as UrlQueryInput, fullKey);
      } else {
        return `${encodeURIComponent(fullKey)}=${encodeURIComponent(
          String(value),
        )}`;
      }
    })
    .filter((part) => part.length > 0)
    .join('&');
}
