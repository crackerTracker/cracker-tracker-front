import { message } from 'antd';
import { BASE_URL } from 'config/links';
import { RequestMethodsEnum } from './types';
import getQueryString from './getQueryString';

type RequestParams = {
  url: string;
  method: RequestMethodsEnum | string;
  headers: any;
  body?: any;
};

// correct only if the get url hasn't a query while get-request
const request = async ({
  url,
  method,
  headers,
  body = null,
}: RequestParams) => {
  try {
    const isGet = method === RequestMethodsEnum.GET;

    if (body && !isGet) {
      body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    const formedUrl = isGet ? `${url}${getQueryString(body)}` : url;

    const response = await fetch(`${BASE_URL}${formedUrl}`, {
      method,
      body: isGet ? undefined : body,
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
