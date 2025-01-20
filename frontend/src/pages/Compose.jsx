import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Compose() {
  const [posts, setPosts] = useState({
    title: '',
    content: '',
    visibility: 'public',
  });
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const { title, content } = posts; // Destructure title and content for validation

    if (!title || !content) {
      alert('Please enter a title and content!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/post/create?userId=678634e272423ae52dc2efaa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(posts),
      });
      console.log(response)
      if (response.ok) {
        navigate('/myposts'); // Redirect on successful API call
      } else {
        console.error('Failed to create post');
        alert('An error occurred while creating the post.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-gray-200 mt-16 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Post</h2>
      <input
        type="text"
        name="title"
        value={posts.title}
        onChange={handleChange}
        placeholder="Enter title here..."
        className="w-full p-3 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="content"
        value={posts.content}
        onChange={handleChange}
        placeholder="Write your content here..."
        className="w-full p-3 mb-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="6"
      />
      <div className="flex items-center mb-4">
        <label className="mr-4">Visibility:</label>
        <label className="mr-2">
          <input
            type="radio"
            name="visibility"
            value="public"
            checked={posts.visibility === 'public'}
            onChange={handleChange}
          />
          Public
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value="private"
            checked={posts.visibility === 'private'}
            onChange={handleChange}
          />
          Private
        </label>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-md p-2 w-full hover:from-blue-400 hover:to-blue-600 transition-all duration-500 ease-in-out"
      >
        Submit
      </button>
      <button
        onClick={handleCancel}
        className="bg-gradient-to-br my-5 from-red-600 to-red-500 text-white rounded-md p-2 w-full hover:from-red-400 hover:to-red-600 transition-all duration-500 ease-in-out"
      >
        Cancel
      </button>
    </div>
  );
}
