import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';
import { FileModel } from '@prisma/client';

export default async function handleUploadFile(
  files: any,
  revalidateOptions?: { paths?: string[]; tags?: string[] }
) {
  try {
    const token = getCookie('token');
    if (typeof token === 'undefined') {
      return;
    }
    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      formData.append(files.item(key).name, files.item(key));
    });

    const payload = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${host}/files`;
    const res = await axios.post(url, formData, payload);
    const revalidate: any = {
      'tag[0]': `getFiles`,
    };
    revalidateOptions?.tags?.forEach((tag, ind) => {
      revalidate['tag[' + (6 + ind) + ']'] = tag;
    });
    revalidateOptions?.paths?.forEach((path, ind) => {
      revalidate['path[' + (6 + ind) + ']'] = path;
    });
    handleRevalidate(revalidate);

    return res.data as { files: FileModel[] };
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
