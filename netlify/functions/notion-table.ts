import { Handler } from '@netlify/functions';
import { Client } from '@notionhq/client';
import fetch from 'node-fetch';

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_TOKEN });
const dbId = 'da8e32704f7844b981bd5a98cb446403';

export const handler: Handler = async () => {
  const joke = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'text/plain',
    },
  }).then((res) => res.text());

  const response = await notion.pages.create({
    parent: { database_id: dbId },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: joke,
            },
          },
        ],
      },
    },
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(response, null, 2),
  };
};
