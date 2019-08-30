import { get as httpGet } from 'http';
import { get as httpsGet } from 'https';

export async function handler(event) {
  const { url } = event.queryStringParameters;

  if (!url) {
    return {
      statusCode: 400,
      body: 'url required',
    };
  }

  const get = /^https/.test(url) ? httpsGet : httpGet;

  try {
    const bufferList = [];
    let totalLength = 0;
    const response = await new Promise((resolve, reject) => {
      get(url, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          reject(res);
          return;
        }

        res.on('end', () => { resolve(res); });
        res.on('data', (chunk) => {
          bufferList.push(chunk);
          totalLength += chunk.length;
        });
      }).on('error', reject);
    });

    return {
      statusCode: response.statusCode,
      headers: {
        'content-type': response.headers['content-type'],
      },
      isBase64Encoded: true,
      body: Buffer.concat(bufferList, totalLength).toString('base64'),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: error.statusMessage || error.message,
    };
  }
}
