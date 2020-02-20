import RSS from 'rss';
import Post from '../models/post';

export const list = async (req, res) => {
  console.log('here');
  const posts = await Post.find()
    .populate('author')
    .populate('category')
    .sort('-created');
  const feed = new RSS({
    title: 'upvotocracy.com RSS feed',
    description: 'Zero moderation Reddit clone.',
    feed_url: 'https://upvotocracy.com/api/1/rss',
    site_url: 'https://upvotocracy.com',
    image_url: 'https://upvotocracy.com/images/favicon-196x196.png',
    copyright: `&copy; 2020 upvotocracy.com`,
    language: 'en',
    pubDate: new Date(),
    ttl: '60',
  });

  console.log(posts, 'posts');

  posts.map(item => {
    const { title, category } = item;
    const categories = [category.name];
    const author = item.author.username;
    const url = `https://upvotocracy.com/a/${category.name}/${item._id}`;

    feed.item({
      title,
      url, // link to the item
      guid: item.id, // optional - defaults to url
      categories, // optional - array of item categories
      author, // optional - defaults to feed author property
      date: item.created, // any format that js Date can parse.
    });
  });

  const xml = feed.xml({ indent: true });
  res.type('application/xml');
  res.send(xml);
};

export default {
  list,
};
