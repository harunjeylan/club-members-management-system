export default function getArrayValues(populate: string | string[]): string[] {
  if (typeof populate === 'string') {
    return [populate];
  } else {
    return populate ?? [];
  }
}
