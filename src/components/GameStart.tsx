import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Brain3D from './Brain3D';
import styles from '../styles/GameStart.module.css';

interface GameStartProps {
  onStart: () => void;
  isTransitioning: boolean;
}

const GameStart: React.FC<GameStartProps> = ({ onStart, isTransitioning }) => {
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

  const startGame = () => {
    onStart();
  };

  const portfolioArt = `

  ██▓███   ▒█████   ██▀███  ▄▄▄█████▓  █████▒▒█████   ██▓     ██▓ ▒█████  
  ▓██░  ██▒▒██▒  ██▒▓██ ▒ ██▒▓  ██▒ ▓▒▓██   ▒▒██▒  ██▒▓██▒    ▓██▒▒██▒  ██▒
  ▓██░ ██▓▒▒██░  ██▒▓██ ░▄█ ▒▒ ▓██░ ▒░▒████ ░▒██░  ██▒▒██░    ▒██▒▒██░  ██▒
  ▒██▄█▓▒ ▒▒██   ██░▒██▀▀█▄  ░ ▓██▓ ░ ░▓█▒  ░▒██   ██░▒██░    ░██░▒██   ██░
  ▒██▒ ░  ░░ ████▓▒░░██▓ ▒██▒  ▒██▒ ░ ░▒█░   ░ ████▓▒░░██████▒░██░░ ████▓▒░
  ▒▓▒░ ░  ░░ ▒░▒░▒░ ░ ▒▓ ░▒▓░  ▒ ░░    ▒ ░   ░ ▒░▒░▒░ ░ ▒░▓  ░░▓  ░ ▒░▒░▒░ 
  ░▒ ░       ░ ▒ ▒░   ░▒ ░ ▒░    ░     ░       ░ ▒ ▒░ ░ ░ ▒  ░ ▒ ░  ░ ▒ ▒░ 
  ░░       ░ ░ ░ ▒    ░░   ░   ░       ░ ░   ░ ░ ░ ▒    ░ ░    ▒ ░░ ░ ░ ▒  
               ░ ░     ░                         ░ ░      ░  ░ ░      ░ ░  
                                                                             
  `;

  return (
    <div className={`${styles.container} ${isTransitioning ? styles.transitioning : ''}`}>
      <div className={`${styles.monitorFrame} ${isTransitioning ? styles.zoomOut : ''}`}>
        <div className={styles.screen}>
          <div className={styles.terminalContent}>
            <div className={styles.asciiArtContainer}>
              <pre className={styles.asciiArt}>{portfolioArt}</pre>
              <div className={styles.brainContainer}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Brain3D />
                </Canvas>
              </div>
            </div>
            <div className={styles.terminalText}>
              FONTAINE ELECTRIC CORPORATION
              <br />
              NeuroLink OS v3.14.15
              <br />
              <br />
              Initializing system...
              <br />
              Checking hardware integrity... OK
              <br />
              Loading neural interfaces... OK
              <br />
              Establishing quantum entanglement... OK
              <br />
              <br />
              WARNING: Unauthorized access detected
              <br />
              Activating defense protocols...
              <br />
              <br />
              ===== SECURE SHELL LOGIN =====
              <br />
              Clearance level ALPHA required
              <br />
              <br />
              Enter neural-key sequence:
              <br />
              Password: ******************
              <br />
              <br />
              Verifying biometric signature...
              <br />
              Scanning retinal patterns...
              <br />
              Analyzing brainwave frequencies...
              <br />
              <br />
              Access: DENIED
              <br />
              Remaining attempts: 3
              <br />
              <br />
              ALERT: Synaptic firewall engaged
              <br />
              Trace program initiated
              <br />
              <br />
              &gt; {showCursor ? '_' : ' '}
            </div>
            <div 
              className={`${styles.startOption} ${isHovered ? styles.highlighted : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={startGame}
            >
              {isHovered ? '---> Start' : 'Start'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStart;