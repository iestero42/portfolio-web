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
      name: 'Neural Network Visualizer',
      description: [
        'An interactive visualization tool for neural networks.',
        'Features real-time training visualization and',
        'network architecture manipulation.',
        '',
        'Key Features:',
        '- Interactive node manipulation',
        '- Real-time weight updates',
        '- Custom dataset integration',
        '- Performance metrics visualization'
      ],
      technologies: ['React', 'TypeScript', 'D3.js', 'TensorFlow.js'],
      github: 'https://github.com/yourusername/neural-viz',
      live: 'https://neural-viz.example.com',
      metrics: [
        'Test Coverage: 94%',
        'Performance Score: 98',
        'Users: 1,200+'
      ]
    },
    // Add other projects similarly...
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
                  {line.startsWith('-') ? <><span className={styles.bullet}></span> {line.slice(2)}</> : line}
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
                  <span className={styles.bullet}> </span>
                  Repository: <a href={project.github} target="_blank" rel="noopener noreferrer">{project.github}</a>
                </div>
                <div>
                  <span className={styles.bullet}> </span>
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