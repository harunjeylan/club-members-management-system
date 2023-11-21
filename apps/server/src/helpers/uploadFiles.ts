import { FileModel } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';
import rewriteFileName from '../utils/rewriteFileName';

export default function uploadFiles(
  files: Omit<FileModel, 'id'>[]
): Promise<Partial<Omit<FileModel, 'id'>[]>> {
  return new Promise((resolve, reject) => {
    try {
      const uploadedFiles: Partial<Omit<FileModel, 'id'>[]> = [];
      Object.keys(files).forEach(async (key) => {
        let fileName = key;
        if (fs.existsSync(path.join(__dirname, 'uploads', fileName))) {
          fileName = rewriteFileName(fileName, uuidV4());
        }
        const filePath = path.join(__dirname, 'uploads', fileName);
        fs.writeFileSync(filePath, fs.readFileSync(files[key].path));
        uploadedFiles.push({
          originalName: files[key].name,
          name: fileName,
          size: files[key].size,
          type: files[key].type,
        });
      });
      resolve(uploadedFiles);
    } catch (error) {
      reject(error);
    }
  });
}
