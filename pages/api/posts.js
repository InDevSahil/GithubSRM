import connectDB from '../../lib/mongodb';
import Post from '../../models/Post';

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const posts = await Post.find({}).sort({ timestamp: -1 });
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
      }
      break;

    case 'POST':
      try {
        const { title, content, author } = req.body;
        const newPost = new Post({
          title,
          content,
          author,
          timestamp: new Date(),
        });
        await newPost.save();
        res.status(201).json(newPost);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
