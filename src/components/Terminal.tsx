import React, { useState, useCallback } from 'react';
import styles from '../styles/Terminal.module.css';
import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface TerminalProps {
  isVisible: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ isVisible }) => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const tabs: Tab[] = [
    { id: 'home', title: 'Home', content: <Home /> },
    { id: 'about', title: 'About', content: <About /> },
  ];

  const handleTabClick = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  return (
    <div className={`${styles.terminal} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className={`${styles.content} ${activeTab === 'about' ? styles.aboutActive : ''}`}>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
      {activeTab === 'about' && (
        <div className={styles.skillsTerminal}>
          <div className={styles.skillsHeader}>Skills</div>
          <Skills />
        </div>
      )}
    </div>
  );
};

export default Terminal;