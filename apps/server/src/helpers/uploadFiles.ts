import fs from 'fs';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';
import rewriteFileName from '../utils/rewriteFileName';
import { FileType } from '@club-members/types';

export default function uploadFiles(files: object): Promise<FileType[]> {
  return new Promise((resolve, reject) => {
    try {
      const uploadedFiles: FileType[] = [];
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