import React, { useState, useEffect } from 'react';
import styles from '../../styles/Skills.module.css';

interface Skill {
  name: string;
  level: number; // 0 to 100
}

const Skills: React.FC = () => {
  const [visibleSkills, setVisibleSkills] = useState<number>(0);
  const skills: Skill[] = [
    { name: "JavaScript", level: 70 },
    { name: "TypeScript", level: 70 },
    { name: "React", level: 60 },
    { name: "Node.js", level: 82 },
    { name: "Python", level: 85 },
    { name: "SQL", level: 85 },
    { name: "HTML/CSS", level: 90 },
    { name: "Git", level: 85 },
    { name: "Docker", level: 70 },
    { name: "Java", level: 90 },
    { name: "C/C++", level: 95 },
    { name: "Linux", level: 80 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSkills(prev => (prev < skills.length ? prev + 1 : prev));
    }, 200);

    return () => clearInterval(timer);
  }, [skills.length]);

  const renderProgressBar = (level: number, index: number) => {
    const segments = 20; // Total number of segments in the progress bar
    const filledSegments = Math.round((level / 100) * segments);
    const emptySegments = segments - filledSegments;

    return (
      <pre className={styles.progressBar}>
        <span className={styles.bracket}>[</span>
        <span className={`${styles.filled} ${styles.animatedProgress}`} style={{ animationDelay: `${index * 0.2}s` }}>
          {'='.repeat(filledSegments)}
          {'>'}
        </span>
        <span className={styles.empty}>{' '.repeat(emptySegments)}</span>
        <span className={styles.bracket}>]</span>
        <span className={styles.percentage}> {level}%</span>
      </pre>
    );
  };

  return (
    <div className={styles.skills}>
      <div className={styles.skillsHeader}>$ sudo apt install skills</div>
      <div className={styles.skillsList}>
        {skills.slice(0, visibleSkills).map((skill, index) => (
          <div key={index} className={styles.skillItem}>
            <div className={styles.skillName}>
              <span className={styles.bullet}>{'>>'}</span> {skill.name}
            </div>
            {renderProgressBar(skill.level, index)}
          </div>
        ))}
      </div>
      {visibleSkills === skills.length && (
        <div className={styles.cursor}>_</div>
      )}
    </div>
  );
};

export default Skills;