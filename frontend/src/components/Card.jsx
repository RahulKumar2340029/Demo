import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ title, content, created, postId }) {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {content.length > 50 ? content.substring(0, 20) + '...' : content}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{created}</p>
      <Link
        to={`/read-more/${postId}`} // Route to the ReadMore component
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
      >
        Read more
      </Link>
    </div>
  );
}
