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

const WINDOWS_1252_BYTES: Record<string, number> = {
  '\u20ac': 0x80, '\u201a': 0x82, '\u0192': 0x83, '\u201e': 0x84,
  '\u2026': 0x85, '\u2020': 0x86, '\u2021': 0x87, '\u02c6': 0x88,
  '\u2030': 0x89, '\u0160': 0x8a, '\u2039': 0x8b, '\u0152': 0x8c,
  '\u017d': 0x8e, '\u2018': 0x91, '\u2019': 0x92, '\u201c': 0x93,
  '\u201d': 0x94, '\u2022': 0x95, '\u2013': 0x96, '\u2014': 0x97,
  '\u02dc': 0x98, '\u2122': 0x99, '\u0161': 0x9a, '\u203a': 0x9b,
  '\u0153': 0x9c, '\u017e': 0x9e, '\u0178': 0x9f,
};

const MOJIBAKE_MARKERS = /(?:Ã|Â|â|ðŸ|ï¸|à¤|à¥)/g;

function mojibakeScore(value: string): number {
  return (value.match(MOJIBAKE_MARKERS) || []).length
    + (value.match(/\ufffd/g) || []).length * 10;
}

function decodeByteRun(value: string): string {
  if (mojibakeScore(value) === 0) return value;

  const bytes: number[] = [];
  for (const char of value) {
    const code = char.codePointAt(0)!;
    const byte = code <= 0xff ? code : WINDOWS_1252_BYTES[char];
    if (byte === undefined) return value;
    bytes.push(byte);
  }

  try {
    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(bytes));
    return mojibakeScore(decoded) < mojibakeScore(value) ? decoded : value;
  } catch {
    return value;
  }
}

function decodeUtf8Mojibake(value: string): string {
  let output = '';
  let byteRun = '';

  const flush = () => {
    output += decodeByteRun(byteRun);
    byteRun = '';
  };

  for (const char of value) {
    const code = char.codePointAt(0)!;
    if (code <= 0xff || WINDOWS_1252_BYTES[char] !== undefined) {
      byteRun += char;
    } else {
      flush();
      output += char;
    }
  }
  flush();
  return output;
}

function repairText(value: string): string {
  const replaced = REPLACEMENTS.reduce(
    (text, [broken, correct]) => text.replaceAll(broken, correct),
    value,
  );
  return decodeUtf8Mojibake(decodeUtf8Mojibake(replaced));
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
