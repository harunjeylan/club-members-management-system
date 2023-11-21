export default function getArrayValues(value: string | string[]): string[] {
  if (typeof value === 'string') {
    return [value];
  } else {
    return value ?? [];
  }
}
