import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';

const Home: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const lines = [
    "Welcome to My Portfolio Terminal",
    "================================",
    "",
    "Hello! I'm [Your Name], a Full Stack Developer.",
    "",
    "Navigate through the tabs above to learn more about me,",
    "my projects, and how to get in touch.",
    "",
    "Enjoy exploring my digital space!",
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
    <div className={styles.home}>
      {lines.slice(0, visibleLines).map((line, index) => (
        <div key={index} className={styles.line}>{line}</div>
      ))}
      {visibleLines === lines.length && (
        <div className={styles.cursor}>_</div>
      )}
    </div>
  );
};

export default Home;