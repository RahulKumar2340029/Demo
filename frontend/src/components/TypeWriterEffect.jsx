import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

function TypewriterEffect({ text }) {
  const element = useRef(null);

  useEffect(() => {
    const options = {
      strings: [text], // The text to be typed
      typeSpeed: 60,   // Faster typing speed (lower number = faster)
      backSpeed: 30,   // Faster backspacing speed
      backDelay: 500,  // Delay before starting backspacing
      startDelay: 500, // Delay before starting to type
      loop: true,      // Loop the typing effect
      showCursor: true, // Show cursor while typing
      cursorChar: '|',  // Custom cursor character
    };

    const typed = new Typed(element.current, options);

    return () => {
      typed.destroy(); 
    };
  }, [text]);

  return (
    <span
      ref={element}
      className="text-2xl font-semibold font-courier text-blue-700 dark:text-white tracking-wide"
    ></span>
  );
}

export default TypewriterEffect;
