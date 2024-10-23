import React, { useState, useCallback } from 'react';
import styles from '../styles/Terminal.module.css';

import Home from './sections/Home';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import ProjectDetails from './sections/ProjectDetails';
import Contact from './sections/Contact';

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
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const tabs: Tab[] = [
    { id: 'home', title: 'HOME', content: <Home /> },
    { id: 'about', title: 'ABOUT', content: <About /> },
    { id: 'projects', title: 'PROJECTS', content: <Projects onProjectSelect={setSelectedProject} /> },
    { id: 'contactMe', title: 'CONTACT ME', content: <Contact /> },
  ];

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
      {activeTab === 'projects' && selectedProject && (
          <div className={styles.projectDetailsTerminal}>
            <ProjectDetails projectId={selectedProject} onClose={() => setSelectedProject(null)} />
          </div>
        )}
      {activeTab === 'ContactMe' && selectedProject && (
          <div className={styles.projectDetailsTerminal}>
            <ProjectDetails projectId={selectedProject} onClose={() => setSelectedProject(null)} />
          </div>
        )}
    </div>
  );
};

export default Terminal;