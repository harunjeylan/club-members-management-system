import { host } from '@client/config/host.config';
import { FileModel } from '@prisma/client';

export default function getFileUrl(file: FileModel) {
  return `${host}/files/${file.name}`;
}
