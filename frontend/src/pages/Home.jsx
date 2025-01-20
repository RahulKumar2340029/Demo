import React, { useEffect } from 'react';
import TypewriterEffect from '../components/TypewriterEffect'; // Import the Typewriter effect

function Home() {
  const textToType = "Welcome to Postify! Let's get started...";
  useEffect(() => {
    console.log('Cookies:', document.cookie);
}, []);
  
  return (
    <div className="home-page">
      <div className="flex justify-center items-center h-screen text-center">
        <div>
          <h1 className="text-4xl font-bold mb-6">
            <TypewriterEffect text={textToType} />
          </h1>
          <p className="text-lg font-courier ">
            Explore, share, and create posts on <span className='text-blue-700 font-bold'>Postify</span>. Start by signing up or logging in.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
