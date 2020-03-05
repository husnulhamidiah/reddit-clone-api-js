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
  const thumb = $('meta[property="og:image"]').attr('content') || $('meta["twitter:image"]').attr('content');

  res.json({
    title,
    doc,
    thumb,
  });
};

export default {
  get,
};
