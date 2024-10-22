import React, { useState, useEffect } from 'react';
import styles from '../../styles/About.module.css';

interface CommandOutput {
  command: string;
  output: string[];
}

const About: React.FC = () => {
  const [visibleCommands, setVisibleCommands] = useState<number>(0);
  
  const commands: CommandOutput[] = [
    {
      command: "whoami",
      output: [
        "John Doe",
        "Full Stack Developer",
        "Location: Silicon Valley, CA"
      ]
    },
    {
      command: "cat personal-info.txt",
      output: [
        "I am a passionate developer with 5+ years of experience",
        "building web applications and solving complex problems.",
        "Currently working on innovative projects and",
        "always eager to learn new technologies."
      ]
    },
    {
      command: "ls soft-skills/",
      output: [
        ">> Communication",
        "   - Clear and effective communication",
        "   - Technical documentation",
        "   - Public speaking",
        "",
        ">> Leadership",
        "   - Team management",
        "   - Project coordination",
        "   - Mentoring",
        "",
        ">> Problem Solving",
        "   - Critical thinking",
        "   - Analytical approach",
        "   - Innovation mindset"
      ]
    },
    {
      command: "cat education.txt",
      output: [
        "B.S. Computer Science",
        "Tech University",
        "Graduation: 2020",
        "GPA: 3.8/4.0"
      ]
    },
    {
      command: "cat interests.txt",
      output: [
        ">> Professional",
        "   - Artificial Intelligence",
        "   - Open Source Development",
        "   - Cloud Computing",
        "",
        ">> Personal",
        "   - Photography",
        "   - Playing Guitar",
        "   - Hiking"
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCommands(prev => (prev < commands.length ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.about}>
      {commands.slice(0, visibleCommands).map((cmd, index) => (
        <div key={index} className={styles.commandBlock}>
          <div className={styles.commandLine}>
            <span className={styles.prompt}>$</span>
            <span className={styles.command}>{cmd.command}</span>
          </div>
          <div className={styles.output}>
            {cmd.output.map((line, lineIndex) => (
              <div 
                key={lineIndex} 
                className={`${styles.line} ${line.startsWith('>>') ? styles.category : ''}`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      ))}
      {visibleCommands === commands.length && (
        <div className={styles.commandLine}>
          <span className={styles.prompt}>$</span>
          <span className={styles.cursor}>_</span>
        </div>
      )}
    </div>
  );
};

export default About;