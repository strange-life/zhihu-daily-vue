import { get } from 'https';

export async function handler(event) {
  const { date } = event.queryStringParameters;

  if (!date) {
    return {
      statusCode: 400,
      body: 'date required',
    };
  }

  try {
    let body = '';
    const response = await new Promise((resolve, reject) => {
      get(`https://news-at.zhihu.com/api/4/news/before/${date}`, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          reject(res);
          return;
        }

        res.setEncoding('utf8');
        res.on('error', reject);
        res.on('end', () => {
          resolve(res);
        });
        res.on('data', (chunk) => {
          body += chunk;
        });
      }).on('error', reject);
    });

    return {
      statusCode: response.statusCode,
      headers: {
        'content-type': response.headers['content-type'],
      },
      body,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: error.statusMessage || error.message,
    };
  }
}
