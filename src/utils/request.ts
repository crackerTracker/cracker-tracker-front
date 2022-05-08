import { message } from 'antd';
import { BASE_URL } from 'config/links';

type RequestParams = {
  url: string;
  method: string;
  headers: any;
  body?: any;
};

const request = async ({
  url,
  method,
  headers,
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
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так');
    }

    return data;
  } catch (e: any) {
    message.error(e.message);
    throw e;
  }
};

export default request;
