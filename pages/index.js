import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  const deletePost = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      fetchPosts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Blog Posts</h1>
          <Link href="/create" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
            Create New Post
          </Link>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content.substring(0, 200)}...</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>By {post.author}</span>
                <span>{new Date(post.timestamp).toLocaleDateString()}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/edit/${post._id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                  Edit
                </Link>
                <button onClick={() => deletePost(post._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
