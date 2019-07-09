import { get } from 'https';

export async function handler(event) {
  const { src } = event.queryStringParameters;

  if (!src) {
    return {
      statusCode: 400,
      body: 'src required',
    };
  }

  try {
    let body = '';
    const response = await new Promise((resolve, reject) => {
      get(src, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          reject(res);
          return;
        }

        res.setEncoding('base64');
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
      isBase64Encoded: true,
      body,
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: error.statusMessage || error.message,
    };
  }
}
