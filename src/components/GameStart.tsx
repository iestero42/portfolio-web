import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Brain3D from './Brain3D';
import styles from '../styles/GameStart.module.css';

interface GameStartProps {
  onStart: () => void;
  isTransitioning: boolean;
}

const GameStart: React.FC<GameStartProps> = ({ onStart, isTransitioning }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  const startGame = () => {
    onStart();
  };

  const boxWidth = 50; // Width of the box in characters
  const title = "NEURAL INTERFACE v2.0";
  const padding = Math.floor((boxWidth - title.length - 2) / 2); // Calculate padding for centering
  const leftPad = padding + (title.length % 2); // Adjust left padding for odd-length titles
  const rightPad = boxWidth - title.length - leftPad;

  const terminalLines = [
    "SYSTEM INITIALIZATION",
    "━━━━━━━━━━━━━━━━━━━━",
    "",
    "Establishing neural link...",
    "Initializing quantum core...",
    "Loading AI modules...",
    "",
    `╔${'═'.repeat(boxWidth)}╗`,
    `║${' '.repeat(leftPad)}${title}${' '.repeat(rightPad)}║`,
    `╚${'═'.repeat(boxWidth)}╝`,
    "",
    "CORE SYSTEMS:",
    "> Quantum Processing: ONLINE",
    "> Neural Network: ACTIVE",
    "> Defense Systems: ENGAGED",
    "> Access Level: RESTRICTED",
    "",
    "Awaiting authorization...",
    "",
    "[PRESS START TO INITIALIZE]"
  ];

  return (
    <div className={`${styles.container} ${isTransitioning ? styles.zoomOut : ''}`}>
      <div className={`${styles.monitorFrame} ${isTransitioning ? styles.zoomOut : ''}`}>
        <div className={styles.screen}>
          <div className={styles.terminalContent}>
            <div className={styles.asciiArtContainer}>
              <div className={styles.brainContainer}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Brain3D />
                </Canvas>
              </div>
            </div>
            <div className={styles.terminalText}>
              {terminalLines.map((line, index) => (
                <div key={index} className={index < visibleLines ? styles.terminalLines : styles.terminalLinesHidden}>{line}</div>
              ))}
              &gt; {showCursor ? '_' : ' '}
            </div>
          </div>
        </div>
        <div 
              className={`${styles.startOption} ${isHovered ? styles.highlighted : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={startGame}
            >
              {isHovered ? '>> INITIALIZE <<' : 'START'}
            </div>
      </div>
    </div>
  );
};

export default GameStart;