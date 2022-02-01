import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

export const handler: Handler = async () => {
  await fetch('https://api.netlify.com/build_hooks/61f98ea048cbc63711d3bff3', {
    method: 'POST',
  });

  return {
    statusCode: 200,
    body: 'rebuild triggered',
  };
};
