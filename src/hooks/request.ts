import { BASE_URL } from 'config/links';

type RequestParams = {
  url: string;
  method: string;
  headers: any;
  body?: any;
};

const request = async ({
  url,
  method = 'GET',
  headers = {},
  body = null,
}: RequestParams) => {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${BASE_URL}${url}`, {
      method,
      body,
      headers,
    });
    const data = response.json();

    if (!response.ok) {
      const msg = await data.then((d) => d.message);
      throw new Error(msg || 'Что-то пошло не так');
    }

    return data;
  } catch (e: any) {
    console.log(e.message);
    throw e;
  }
};

export default request;
