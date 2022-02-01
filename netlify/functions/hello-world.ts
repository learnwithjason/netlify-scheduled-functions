import { schedule } from '@netlify/functions';

const handlerFn = async () => {
  return {
    statusCode: 200,
    body: 'waddup chat?',
  };
};

export const handler = schedule('* * * * *', handlerFn);
