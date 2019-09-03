import { get } from 'https';

const types = ['long', 'short'];
const regParam = /^\/comment\/(\d+)$/;

function getComments({ id, type }) {
  return new Promise((resolve, reject) => {
    get(`https://news-at.zhihu.com/api/4/story/${id}/${type}-comments`, (response) => {
      if (response.statusCode !== 200) {
        response.resume();
        reject(response);
        return;
      }

      const bufferList = [];
      let totalLength = 0;

      response.on('end', () => {
        resolve({ response, data: JSON.parse(Buffer.concat(bufferList, totalLength).toString()) });
      });
      response.on('data', (chunk) => {
        bufferList.push(chunk);
        totalLength += chunk.length;
      });
    }).on('error', reject);
  });
}

export async function handler(event) {
  const { path } = event;

  if (!regParam.test(path)) {
    return {
      statusCode: 404,
      body: 'Not Found',
    };
  }

  const id = regParam.exec(path)[1];

  try {
    const [{ response, data: longComments }, { data: shortComments }] = await Promise.all(
      types.map(type => getComments({ id, type })),
    );

    longComments.comments.push(...shortComments.comments);

    return {
      statusCode: response.statusCode,
      headers: {
        'content-type': response.headers['content-type'],
      },
      body: JSON.stringify(longComments),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: error.statusMessage || error.message,
    };
  }
}
