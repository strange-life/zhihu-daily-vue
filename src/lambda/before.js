import axios from 'axios';

export async function handler(event) {
  const date = event.queryStringParameters.date || '';

  if (date < '20130520') {
    return {
      statusCode: 422,
      body: 'invalid date',
    };
  }

  try {
    const response = await axios.get(`https://news-at.zhihu.com/api/4/news/before/${date}`);

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    if (error.response) {
      return {
        statusCode: error.response.status,
        body: error.response.statusText,
      };
    }

    return {
      statusCode: 422,
      body: String(error),
    };
  }
}
