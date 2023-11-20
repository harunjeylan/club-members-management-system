import fs from 'fs';
import path from 'path';

export default function deleteFiles(fileName: string): void {
    fs.unlink(path.join(__dirname, 'uploads', fileName), () => null);
}