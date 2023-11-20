export default function rewriteFileName(
    originalName: string,
    addedString: string
  ): string {
    const extension = originalName.split('.').pop();
    const fileName = originalName.replace(`.${extension}`, '');
    const modifiedName = `${fileName}-${addedString}.${extension}`;
    return modifiedName;
  }