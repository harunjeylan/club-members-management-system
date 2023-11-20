
export function fileExtValidator(
  files: any,
  options: { allowedExtArray: string[] }
): { success: boolean; message?: string } {
  const fileExtensions: string[] = [];
  Object.keys(files).forEach((key) => {
    const file = files[key];
    fileExtensions.push(file.type);
  });

  const allowed = fileExtensions.every((type) =>
    options.allowedExtArray?.length
      ? options.allowedExtArray?.includes(type.split('/')[0])
      : true
  );

  if (!allowed) {
    const message =
      `Upload failed. Only ${options.allowedExtArray.toString()} files allowed.`.replaceAll(
        ',',
        ', '
      );

    return { success: false, message };
  }

  return { success: true };
}
