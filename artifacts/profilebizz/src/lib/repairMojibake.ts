const REPLACEMENTS: Array<[string, string]> = [
  ['\u00e2\u20ac\u201d', '\u2014'],
  ['\u00e2\u20ac\u201c', '\u2013'],
  ['\u00e2\u20ac\u2122', '\u2019'],
  ['\u00e2\u20ac\u02dc', '\u2018'],
  ['\u00e2\u20ac\u0153', '\u201c'],
  ['\u00e2\u20ac\u00a6', '\u2026'],
  ['\u00e2\u2020\u2019', '\u2192'],
  ['\u00e2\u2020\u0090', '\u2190'],
  ['\u00e2\u20ac\u00a2', '\u2022'],
  ['\u00e2\u201a\u00b9', '\u20b9'],
  ['\u00c2\u00b7', '\u00b7'],
  ['\u00c2\u00a0', '\u00a0'],
];

function repairText(value: string): string {
  return REPLACEMENTS.reduce(
    (text, [broken, correct]) => text.replaceAll(broken, correct),
    value,
  );
}

export function repairMojibake<T>(value: T): T {
  if (typeof value === 'string') return repairText(value) as T;
  if (Array.isArray(value)) return value.map(item => repairMojibake(item)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, repairMojibake(item)]),
    ) as T;
  }
  return value;
}
