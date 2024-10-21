import React, { useState, useEffect } from 'react';
import styles from '../../styles/Skills.module.css';

const Skills: React.FC = () => {
  const [visibleSkills, setVisibleSkills] = useState<number>(0);
  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "HTML/CSS",
    "Git",
    "Docker",
    "AWS",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSkills(prev => (prev < skills.length ? prev + 1 : prev));
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.skills}>
      <div className={styles.skillsHeader}>$ ls skills</div>
      <ul className={styles.skillsList}>
        {skills.slice(0, visibleSkills).map((skill, index) => (
          <li key={index} className={styles.skillItem}>
            <span className={styles.bullet}>{'>'}</span> {skill}
          </li>
        ))}
      </ul>
      {visibleSkills === skills.length && (
        <div className={styles.cursor}>_</div>
      )}
    </div>
  );
};

export default Skills;