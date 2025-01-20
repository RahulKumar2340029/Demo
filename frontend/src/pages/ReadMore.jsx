import React from 'react';
import { useParams } from 'react-router-dom';

export default function ReadMore() {
  const { postId } = useParams(); // Extract postId from URL
  const posts = JSON.parse(localStorage.getItem('myPosts')) || [];
  const post = posts[postId]; // Retrieve the post by index

  if (!post) {
    return <div className="mt-16">Post not found!</div>;
  }

  return (
    <div className="bg-gray-200 mt-16 h-96 rounded-lg flex justify-around items-center p-6 shadow-lg">
      <div className="font-semibold text-gray-800">
        <h2 className="text-2xl font-bold mb-4">{`Post ${parseInt(postId) + 1}`}</h2>
        <p className="mb-2">{post.content}</p>
        <p className="text-sm text-gray-500">{post.created}</p>
      </div>
    </div>
  );
}
