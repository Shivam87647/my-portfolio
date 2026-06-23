import { useState, useEffect } from 'react';

export default function useTypingCarousel(words) {
  const [typingRole, setTypingRole] = useState('');

  useEffect(() => {
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const type = () => {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        setTypingRole(currentWord.substring(0, letterIndex - 1));
        letterIndex--;
      } else {
        setTypingRole(currentWord.substring(0, letterIndex + 1));
        letterIndex++;
      }

      let typeSpeed = 100;

      if (isDeleting) {
        typeSpeed /= 2;
      }

      if (!isDeleting && letterIndex === currentWord.length) {
        typeSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    type();

    return () => clearTimeout(timeoutId);
  }, [words]);

  return typingRole;
}
