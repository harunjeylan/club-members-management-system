export default function getArrayValues(
  value: string | string[] | null | undefined
): string[] {
  if (typeof value === 'string') {
    return [value];
  } else {
    return value ?? [];
  }
}
