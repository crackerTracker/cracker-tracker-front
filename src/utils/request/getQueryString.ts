const getQueryString = (body: Record<string, number | string> | null) => {
  if (!body) {
    return '';
  }

  const entries = Object.entries(body);

  return entries.reduce((query, [key, value], index) => {
    if (index === 0) {
      return `${query}${key}=${value}`;
    }

    return `${query}&${key}=${value}`;
  }, '?');
};

export default getQueryString;
