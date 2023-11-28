import { server_host } from '@client/config/host.config';
import { FileModel } from '@prisma/client';

export default function getFileUrl(file: FileModel) {
  return `${server_host}/files/${file.name}`;
}
