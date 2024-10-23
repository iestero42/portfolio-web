import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.css';

const Home: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<number>(0);
  
  const welcomeArt = [
    "████████╗  ██████╗  ██████╗  ████████╗ ███████╗  ██████╗  ██╗      ██╗  ██████╗",
    "██╔═══██║ ██╔═══██╗ ██╔══██╗ ╚══██╔══╝ ██╔════╝ ██╔═══██╗ ██║      ██║ ██╔═══██╗",
    "████████║ ██║   ██║ ██████╔╝    ██║    █████╗   ██║   ██║ ██║      ██║ ██║   ██║",
    "██╔═════╝ ██║   ██║ ██╔══██╗    ██║    ██╔══╝   ██║   ██║ ██║      ██║ ██║   ██║",
    "██║        ██████╔╝ ██║  ██║    ██║    ██║      ╚██████╔╝ ███████╗ ██║ ╚██████╔╝",
    "╚═╝        ╚═════╝  ╚═╝  ╚═╝    ╚═╝    ╚═╝       ╚═════╝  ╚══════╝ ╚═╝  ╚═════╝ "
  ];

  const sections = [
    {
      type: 'ascii',
      content: welcomeArt
    },
    {
      type: 'command',
      content: 'system.init()'
    },
    {
      type: 'response',
      content: [
        'Initializing portfolio system...',
        'Loading modules...',
        'Establishing connection...',
        'System ready.'
      ]
    },
    {
      type: 'command',
      content: 'portfolio.getInfo()'
    },
    {
      type: 'response',
      content: [
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        'Welcome to my interactive portfolio terminal',
        'Version 2.0.0',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        'Hello! I\'m Israel Estero Agueda',
        'Full Stack Engineer | Problem Solver | Tech Enthusiast',
        '',
        'Navigation Commands:',
        '  > Use tabs above to explore different sections',
        '  > Press [Enter] to interact with elements',
        '  > Type \'help\' for more commands',
        '',
        'Status: Online and ready for interaction',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSections(prev => (prev < sections.length ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [sections.length]);

  return (
    <div className={styles.home}>
      <div className={styles.terminal}>
        {sections.slice(0, visibleSections).map((section, sectionIndex) => (
          <div key={sectionIndex} className={styles[section.type]}>
            {section.type === 'command' ? (
              <div className={styles.commandLine}>
                <span className={styles.prompt}>{'>'}</span>
                <span className={styles.command}>{section.content}</span>
              </div>
            ) : (
              Array.isArray(section.content) && section.content.map((line, lineIndex) => (
                <div key={lineIndex} className={styles.line}>
                  {line}
                </div>
              ))
            )}
          </div>
        ))}
        {visibleSections === sections.length && (
          <div className={styles.commandLine}>
            <span className={styles.prompt}>{'>'}</span>
            <span className={styles.cursor}>_</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;