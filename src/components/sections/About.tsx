import React, { useState, useEffect } from 'react';
import styles from '../../styles/About.module.css';

const About: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const lines = [
    "=== ABOUT ME ===",
    "",
    "Name: John Doe",
    "Occupation: Full Stack Developer",
    "Location: Silicon Valley, CA",
    "",
    "Skills:",
    "- JavaScript/TypeScript",
    "- React.js",
    "- Node.js",
    "- Python",
    "- SQL",
    "",
    "Education:",
    "- B.S. Computer Science, Tech University (2020)",
    "",
    "Interests:",
    "- Artificial Intelligence",
    "- Blockchain Technology",
    "- Open Source Development",
    "",
    "Type 'help' for more commands."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => (prev < lines.length ? prev + 1 : prev));
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.about}>
      {lines.slice(0, visibleLines).map((line, index) => (
        <div key={index} className={styles.line}>
          {line.startsWith('-') ? (
            <>
              <span className={styles.bullet}>{'>'}</span> {line.slice(2)}
            </>
          ) : (
            line
          )}
        </div>
      ))}
      {visibleLines === lines.length && (
        <div className={styles.cursor}>_</div>
      )}
    </div>
  );
};

export default About;