import { get } from 'https';

const regPath = /\/extra\/(\d+)$/;

export async function handler(event) {
  const { path } = event;

  if (!regPath.test(path)) {
    return {
      statusCode: 404,
      body: 'Not Found',
    };
  }

  const id = regPath.exec(path)[1];

  try {
    const bufferList = [];
    let totalLength = 0;
    const response = await new Promise((resolve, reject) => {
      get(`https://news-at.zhihu.com/api/4/story-extra/${id}`, (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          reject(res);
          return;
        }

        res.on('end', () => {
          resolve(res);
        });

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
      body: Buffer.concat(bufferList, totalLength).toString(),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: error.statusMessage || error.message,
    };
  }
}
