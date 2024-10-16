import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Brain3D from './Brain3D';
import styles from '../styles/GameStart.module.css';

const GameStart = () => {
  const router = useRouter();
  const starFieldRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const starField = starFieldRef.current;
    const starCount = 900;
    const clusterCount = 3;
    const clusterSize = 15;
    const pixelSize = 4;

    const backgroundStarColors = ['#FFFFFF', '#AAAAAA', '#888888', '#666666'];

    const createStar = (x: number, y: number, size: number, colors: string | any[]) => {
      const star = document.createElement('div');
      star.className = styles.star;
      star.style.left = `${Math.floor(x / pixelSize) * pixelSize}px`;
      star.style.top = `${Math.floor(y / pixelSize) * pixelSize}px`;
      star.style.width = `${size * pixelSize}px`;
      star.style.height = `${size * pixelSize}px`;
      star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      if (starField)
        starField.appendChild(star);

      const duration = 2 + Math.random() * 2;
      star.animate(
        [
          { opacity: 0.2 },
          { opacity: 0.2 },
          { opacity: 1 },
          { opacity: 1 },
          { opacity: 0.2 },
        ],
        {
          duration: duration * 1000,
          iterations: Infinity,
          easing: 'steps(4, end)'
        }
      );
    };

    const createStarCluster = (centerX: number, centerY: number, starCount: number, maxRadius: number, colors: string) => {
      for (let i = 0; i < starCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * maxRadius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const size = Math.floor(Math.random() * 2) + 1;
        createStar(x, y, size, colors);
      }
    };

    // Create background stars
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      createStar(x, y, 1, backgroundStarColors);
    }

    // Create star clusters
    for (let i = 0; i < clusterCount; i++) {
      const centerX = Math.random() * window.innerWidth;
      const centerY = Math.random() * window.innerHeight;
      createStarCluster(centerX, centerY, clusterSize, 80, "#FFFFFF");
    }

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const startGame = () => {
    router.push('/home');
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
    <div className={styles.backgroundContainer}>
      <div ref={starFieldRef} className={styles.starField}></div>
      <div className={styles.monitorFrame}>
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