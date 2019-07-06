import axios from 'axios';

export async function handler(event) {
  const id = event.queryStringParameters.id || 'latest';

  try {
    const response = await axios.get(`https://news-at.zhihu.com/api/4/news/${id}`);

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
