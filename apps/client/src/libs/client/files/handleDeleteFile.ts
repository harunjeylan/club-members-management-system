import { server_host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';

export default async function handleDeleteFile(fileName: string | string[]) {
    try {
      const token = getCookie('token');
      if (typeof token === 'undefined') {
        return;
      }
  
      const payload = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let res: any;
      if (typeof fileName === 'string') {
        res = await axios.delete(`${server_host}/files/${fileName}`, payload);
        handleRevalidate({
          'path[0]': '/files',
          'path[1]': `/files/${fileName}`,
          'tag[0]': 'getFiles',
          'tag[1]': `getFileDetails/${fileName}`,
        });
      } else {
        res = await axios.put(`${server_host}/files`, { fileNames: fileName }, payload);
        handleRevalidate({
          path: '/files',
          tag: 'getFiles',
        });
      }
  
      return res.data;
    } catch (error: any) {
      ;
  
      return error?.response?.data ?? { error: 'Unknown Error' };
    }
  }
  