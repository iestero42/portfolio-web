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
        "Israel Estero Agueda",
        "Full Stack Engineer",
        "Location: Arroyomolinos, Spain"
      ]
    },
    {
      command: "cat personal-info.txt",
      output: [
        "I am a passionate software engineer with nearly a year of experience",
        "in full stack development. I specialize in backend technologies",
        "but also have experience with frontend frameworks.",
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
        "   - Social skills",
        "",
        ">> Leadership",
        "   - Team management",
        "   - Project coordination",
        "   - Decision making",
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
        " >> B.S. Software Engineering",
        "     - Polytechnic University of Madrid",
        "     - Graduation: 2025",
        " >> B.S. Computer Science",
        "     - 42 Madrid",
        "     - Graduation: 2025",
      ]
    },
    {
      command: "cat interests.txt",
      output: [
        ">> Professional",
        "   - Artificial Intelligence",
        "   - Develop new technologies",
        "   - Quantum Computing",
        "",
        ">> Personal",
        "   - Video Games",
        "   - Rock Climbing",
        "   - Hiking",
        "   - Traveling",
        "   - Reading"
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