import { Handler } from '@netlify/functions';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_INTEGRATION_TOKEN });
const dbId = 'da8e32704f7844b981bd5a98cb446403';

export const handler: Handler = async () => {
  const response = await notion.databases.query({ database_id: dbId });

  const loadedItems = response.results.map((res: any) => ({
    key: res.id,
    name: res.properties.Name.title[0].plain_text,
  }));

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loadedItems, null, 2),
  };
};
