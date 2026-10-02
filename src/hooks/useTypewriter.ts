import { useState, useEffect } from 'react';

export function useTypewriter(
  lines: string[],
  typingSpeed = 50,
  deletingSpeed = 25,
  pauseTime = 2000
) {
  const [text, setText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!lines || lines.length === 0) return;

    const currentFullText = lines[lineIndex % lines.length];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (text.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setText(currentFullText.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentFullText.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setLineIndex((prev) => (prev + 1) % lines.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, lineIndex, lines, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}
