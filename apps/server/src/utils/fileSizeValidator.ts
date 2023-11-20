import { NextFunction, Request, Response } from 'express';

export function fileSizeValidator(
  files: object,
  options: { fileSizeMB: number }
) :{ success: boolean; message?: string } {
  const fileSize = options.fileSizeMB ? 0 : options.fileSizeMB * 1024 * 1024;

  const filesOverLimit: string[] = [];
  Object.keys(files).forEach((key) => {
    if (options.fileSizeMB  && files[key].size > fileSize) {
      filesOverLimit.push(files[key].name);
    }
  });

  if (filesOverLimit.length) {
    const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';

    const sentence =
      `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${options.fileSizeMB} MB.`.replaceAll(
        ',',
        ', '
      );

    const message =
      filesOverLimit.length < 3
        ? sentence.replace(',', ' and')
        : sentence.replace(/,(?=[^,]*$)/, ' and');

        return { success: false, message };
  } 
  
  return { success: true, };
}
