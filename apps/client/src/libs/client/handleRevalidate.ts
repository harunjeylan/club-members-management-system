import axios from 'axios';

export default async function handleRevalidate(params: {}) {
  try {
    const url = `/api/revalidate`;
      const res = await axios.get(url, { params });
      console.log(res.data);
      
    return res.data;
  } catch (error: any) {
    return error?.response?.data ?? { error: 'Unknown Error' };
  }
}
