import axios from 'axios';

export async function handler(event) {
  const id = event.queryStringParameters.id || '';

  try {
    const responses = await Promise.all([
      axios.get(`https://news-at.zhihu.com/api/4/story/${id}/long-comments`),
      axios.get(`https://news-at.zhihu.com/api/4/story/${id}/short-comments`),
    ]);

    return {
      statusCode: Math.max(responses[0].status, responses[1].status),
      body: JSON.stringify({
        comments: [...responses[0].data.comments, ...responses[1].data.comments],
      }),
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
