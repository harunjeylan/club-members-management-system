import { host } from '@client/config/host.config';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import handleRevalidate from '../handleRevalidate';

export default async function handleDeleteContact(contactId: string | string[]) {
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
      if (typeof contactId === 'string') {
        res = await axios.delete(`${host}/contacts/${contactId}`, payload);
        handleRevalidate({
          'path[0]': '/contacts',
          'path[1]': `/contacts/${contactId}`,
          'tag[0]': 'getContacts',
          'tag[1]': `getContactDetails/${contactId}`,
        });
      } else {
        res = await axios.put(`${host}/contacts`, { contactIds: contactId }, payload);
        handleRevalidate({
          path: '/contacts',
          tag: 'getContacts',
        });
      }
  
      return res.data;
    } catch (error: any) {
      console.log(error);
  
      return error?.response?.data ?? { error: 'Unknown Error' };
    }
  }
  