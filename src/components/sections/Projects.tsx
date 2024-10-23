import React, { useState, useEffect } from 'react';
import styles from '../../styles/Project.module.css';

interface ProjectsProps {
  onProjectSelect: (projectId: string) => void;
}

interface Project {
  id: string;
  name: string;
  shortDesc: string;
  tags: string[];
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showProjects, setShowProjects] = useState(false);

  const projects: Project[] = [
    {
      id: 'project1',
      name: 'MINISHELL',
      shortDesc: 'Minimal Unix shell implementation',
      tags: ['C']
    },
    {
      id: 'project2',
      name: 'MARXIA',
      shortDesc: 'A trading bot for the stock market',
      tags: ['Python', 'APIs', 'Finance']
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProjects(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : projects.length - 1));
    } else if (event.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev < projects.length - 1 ? prev + 1 : 0));
    } else if (event.key === 'Enter') {
      onProjectSelect(projects[selectedIndex].id);
    }
  };

  return (
    <div 
      className={styles.projects} 
      tabIndex={0} 
      onKeyDown={handleKeyPress}
    >
      <div className={styles.header}>
        <pre className={styles.ascii}>
          ╔══════════════════════════════════╗
          ║          PROJECT INDEX           ║
          ╚══════════════════════════════════╝
        </pre>
      </div>
      
      <div className={`${styles.content} ${showProjects ? styles.visible : ''}`}>
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className={`${styles.projectItem} ${index === selectedIndex ? styles.selected : ''}`}
            onClick={() => {
              setSelectedIndex(index);
              onProjectSelect(project.id);
            }}
          >
            <div className={styles.projectHeader}>
              {index === selectedIndex ? '► ' : '  '}
              {project.name}
            </div>
            <div className={styles.projectDesc}>
              {project.shortDesc}
            </div>
            <div className={styles.projectTags}>
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className={styles.tag}>[{tag}]</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <pre className={styles.ascii}>
          ╔══════════════════════════════════╗
          ║  [↑/↓] Navigate  [Enter] Select  ║
          ╚══════════════════════════════════╝
        </pre>
      </div>
    </div>
  );
};

export default Projects;