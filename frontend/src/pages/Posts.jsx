import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '../components/Card';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('myPosts')) || [];
    setPosts(storedPosts);
  }, []);

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('myPosts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="mt-16 max-w-6xl mx-auto pt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p>No posts yet. Create a post!</p>
        ) : (
          posts.map((post, index) => (
            <div key={post.id} className="relative">
              <Card
                title={post.title} // Pass post title
                content={post.content}
                created={post.created}
                postId={post.id}
              />
              <motion.button
                onClick={() => handleDelete(post.id)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 absolute top-3 right-3"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete
              </motion.button>
            </div>
          ))
        )}
      </div>
      <Link to="/compose" className="text-blue-500 mt-4 inline-block">
        Create a new post
      </Link>
    </div>
  );
}
