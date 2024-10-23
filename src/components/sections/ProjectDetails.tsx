import React, { useState, useEffect } from 'react';
import styles from '../../styles/ProjectDetails.module.css';

interface ProjectDetailsProps {
  projectId: string;
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId, onClose }) => {
  const [visibleSections, setVisibleSections] = useState(0);

  const projectDetails = {
    project1: {
      name: 'Minimal Unix Shell',
      description: [
        'A minimal implementation of a Unix shell with',
        'built-in commands and custom signal handling.',
        '',
        'Key Features:',
        '- Command execution',
        '- Signal handling',
        '- Built-in commands',
        '- Custom environment variables',
        '- History and auto-completion',
        '- Concurrent command execution'
      ],
      technologies: ['C', 'Linux'],
      github: 'https://github.com/iestero42/minishell',
      live: '',
      metrics: [
        'Test Coverage: 94%',
        'Performance Score: 98',
        'Users: 1,200+'
      ]
    },
    project2: {
      name: 'Marx AI',
      description: [
        'A trading bot that uses machine learning',
        'to predict stock market trends and make',
        'automated trades based on historical data.',
        '',
        'Key Features:',
        '- Data collection from APIs',
        '- Machine learning model training',
        '- Real-time market analysis',
        '- Automated trading strategies',
      ],
      technologies: ['Python', 'TensorFlow', 'Finance', 'APIs'],
      github: 'https://github.com/iestero42/marxIA',
      live: '',
      metrics: [
        'Test Coverage: 94%',
        'Performance Score: 98',
        'Users: 1,200+'
      ]
    },
  };

  const project = projectDetails[projectId as keyof typeof projectDetails];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleSections(prev => (prev < 4 ? prev + 1 : prev));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.projectDetails}>
      <pre className={styles.header}>
        ╔══════════════════════════════════╗
        ║        PROJECT DETAILS           ║
        ╚══════════════════════════════════╝
      </pre>
      
      <div className={styles.content}>
        {visibleSections >= 1 && (
          <div className={styles.section}>
            <div className={styles.command}>$ cat project_name.txt</div>
            <div className={styles.output}>
              <div className={styles.title}>{project.name}</div>
            </div>
          </div>
        )}

        {visibleSections >= 2 && (
          <div className={styles.section}>
            <div className={styles.command}>$ cat description.txt</div>
            <div className={styles.output}>
              {project.description.map((line, index) => (
                <div key={index} className={styles.line}>
                  {line.startsWith('-') ? <><span className={styles.bullet}>></span> {line.slice(2)}</> : line}
                </div>
              ))}
            </div>
          </div>
        )}

        {visibleSections >= 3 && (
          <div className={styles.section}>
            <div className={styles.command}>$ ls technologies/</div>
            <div className={styles.output}>
              <div className={styles.tags}>
                {project.technologies.map((tech, index) => (
                  <span key={index} className={styles.tag}>[{tech}]</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {visibleSections >= 4 && (
          <div className={styles.section}>
            <div className={styles.command}>$ cat links.txt</div>
            <div className={styles.output}>
              <div className={styles.links}>
                <div>
                  <span className={styles.bullet}> ></span>
                  Repository: <a href={project.github} target="_blank" rel="noopener noreferrer">{project.github}</a>
                </div>
                <div className={project.live.length == 1 ? '' : styles.visible}>
                  <span className={styles.bullet}>></span>
                  Live Demo: <a href={project.live} target="_blank" rel="noopener noreferrer">{project.live}</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <button className={styles.closeButton} onClick={onClose}>
          [X] Close Window
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;