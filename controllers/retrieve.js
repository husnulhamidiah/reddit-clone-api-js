import fetch from 'node-fetch';
import cheerio from 'cheerio';

export const get = async (req, res) => {
  const url = decodeURIComponent(req.query.url);
  console.log('retrieve', url);
  const doc = await fetch(url)
    .then(doc => doc.text())
    .catch(console.error);

  const $ = cheerio.load(doc);
  const title = $('title').text();

  res.json({
    title,
    doc,
  });
};

export default {
  get,
};
