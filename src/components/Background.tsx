import React from 'react';
import styles from '../styles/Background.module.css';

const Background: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.mGrid} ${styles.topGrid}`} />
      <div className={`${styles.mGrid} ${styles.bottomGrid}`} />
      <div className={styles.horizontalLine} />
    </div>
  );
};

export default Background;