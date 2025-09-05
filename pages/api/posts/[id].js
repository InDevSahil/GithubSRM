import connectDB from '../../../lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const post = await Post.findById(id);
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post' });
      }
      break;

    case 'PUT':
      try {
        const { title, content, author } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          { title, content, author },
          { new: true }
        );
        if (!updatedPost) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
      }
      break;

    case 'DELETE':
      try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
