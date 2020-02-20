import fetch from 'node-fetch';
import cheerio from 'cheerio';

export const get = async (req, res) => {
  const doc = await fetch(req.query.url)
    .then(doc => doc.text())
    .catch(console.error);

  const $ = cheerio.load(doc);
  const title = $('title').text();

  res.json({
    title,
  });
};

export default {
  get,
};
