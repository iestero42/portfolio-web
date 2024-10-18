import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

interface HomeProps {
  isTransitioning: boolean;
}

const Home: React.FC<HomeProps> = ({ isTransitioning }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = `Welcome to my portfolio.\nI'm a developer passionate about creating innovative solutions.\nExplore my projects and skills below.`;

  useEffect(() => {
    if (isTransitioning) {
      const startTypingDelay = setTimeout(() => {
        let i = 0;
        const typingEffect = setInterval(() => {
          if (i < fullText.length) {
            setText((prev) => prev + fullText.charAt(i));
            i++;
          } else {
            clearInterval(typingEffect);
          }
        }, 50);

        return () => clearInterval(typingEffect);
      }, 1000); // Delay start of typing by 1 second

      const cursorBlink = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 500);

      return () => {
        clearTimeout(startTypingDelay);
        clearInterval(cursorBlink);
      };
    }
  }, [isTransitioning]);

  return (
    <div className={`${styles.container} ${isTransitioning ? styles.visible : ''}`}>
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalButton}></div>
          <div className={styles.terminalButton}></div>
          <div className={styles.terminalButton}></div>
        </div>
        <div className={styles.terminalBody}>
          <pre className={styles.typingText}>
            {text}
            {showCursor && <span className={styles.cursor}>█</span>}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Home;