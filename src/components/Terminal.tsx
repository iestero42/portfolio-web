import React, { useState, useEffect } from 'react';
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
  const [showSkills, setShowSkills] = useState<boolean>(false);
  const [showToggle, setShowToggle] = useState<boolean>(false);

  const tabs: Tab[] = [
    { id: 'home', title: 'HOME', content: <Home /> },
    { id: 'about', title: 'ABOUT', content: <About /> },
    { id: 'projects', title: 'PROJECTS', content: <Projects onProjectSelect={setSelectedProject} /> },
    { id: 'contactMe', title: 'CONTACT ME', content: <Contact /> },
  ];

  useEffect(() => {
    if (activeTab === 'about') {
      // Show skills terminal automatically when about tab is selected
      setTimeout(() => {
        setShowSkills(false);
        setShowToggle(true);
      }, 100);
    } else {
      setShowSkills(false);
      // Show toggle button with a delay after skills terminal slides out
      setTimeout(() => {
        setShowToggle(activeTab !== 'home');
      }, 500);
    }
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleToggleSkills = () => {
    setShowSkills(true);
    setShowToggle(false);
  };

  const handleCloseSkills = () => {
    setShowSkills(false);
    // Show toggle button after skills terminal slides out
    setTimeout(() => {
      setShowToggle(true);
    }, 500);
  };

  return (
    <div className={`${styles.terminal} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>

      {/* Skills Toggle Button */}
      <button 
        className={`${styles.toggleSkills} ${!showToggle ? styles.hidden : ''} ${activeTab != 'about' ? styles.hidden : ''}`}
        onClick={handleToggleSkills}
      >
        Show Skills
      </button>

      {/* Skills Terminal */}
      {activeTab === 'about' && showSkills && (
        <div className={styles.skillsTerminal}>
          <div 
            className={styles.closeSkills}
            onClick={handleCloseSkills}
          >
            [X]
          </div>
          <Skills />
        </div>
      )}

      {/* Project Details Terminal */}
      {activeTab === 'projects' && selectedProject && (
        <div className={styles.projectDetailsTerminal}>
          <ProjectDetails 
            projectId={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </div>
      )}
    </div>
  );
};

export default Terminal;