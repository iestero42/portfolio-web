import React, { useState, useEffect } from 'react';
import styles from '../../styles/Contact.module.css';

const Contact: React.FC = () => {
  const [visibleSections, setVisibleSections] = useState<number>(0);

  const sections = [
    {
      type: 'command',
      content: 'contact.init()'
    },
    {
      type: 'response',
      content: [
        '═══════════════════════════════',
        '       CONTACT INTERFACE       ',
        '═══════════════════════════════',
        '',
      ]
    },
    {
      type: 'command',
      content: 'contact.getInfo()'
    },
    {
      type: 'response',
      content: [
        '[CONNECTION ESTABLISHED]',
        '',
        '> Email:    business.israel.estero@gmail.com',
        '> Github:   https://github.com/iestero42',
        '> LinkedIn: www.linkedin.com/in/israel-estero-agueda',
        '> LeetCode: https://leetcode.com/u/0000000000000000000/',
        '',
      ]
    },
    {
      type: 'command',
      content: 'contact.getStatus()'
    },
    {
      type: 'response',
      content: [
        'STATUS: Online and ready for collaboration',
        '',
        'RESPONSE TIME: < 24 hours',
        '',
        'PREFERRED CONTACT METHOD: Email',
        '',
        'CURRENTLY:',
        '> Open to new projects',
        '> Available for new opportunities',
        '',
      ]
    },
    {
      type: 'command',
      content: 'contact.getMessage()'
    },
    {
      type: 'response',
      content: [
        'Let\'s build something amazing together!',
        '',
        'Feel free to reach out through any of',
        'the channels listed above.',
        '',
        '[INITIATING CONTACT PROTOCOLS...]',
      ]
    }
  ];

  useEffect(() => {
    if (visibleSections < sections.length) {
      const timer = setTimeout(() => {
        setVisibleSections(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [visibleSections, sections.length]);

  return (
    <div className={styles.contact}>
      {sections.slice(0, visibleSections).map((section, sectionIndex) => (
        <div 
          key={sectionIndex} 
          className={`${styles.section} ${styles[section.type]}`}
        >
          {section.type === 'command' ? (
            <div className={styles.commandLine}>
              <span className={styles.prompt}>{'>'}</span>
              <span className={styles.command}>{section.content}</span>
            </div>
          ) : (
            <div className={styles.response}>
              {Array.isArray(section.content) ? (
                section.content.map((line: string, lineIndex: number) => (
                  <div 
                    key={lineIndex} 
                    className={`${styles.line} ${line.startsWith('>') ? styles.highlight : ''}`}
                  >
                    {line}
                  </div>
                ))
              ) : (
                <div className={styles.line}>
                  {section.content}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      {visibleSections === sections.length && (
        <div className={styles.cursor}>_</div>
      )}
    </div>
  );
};

export default Contact;