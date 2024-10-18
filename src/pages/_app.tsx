import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import GameStart from '../components/GameStart';
import Home from '../components/Home';
import '../styles/global.css';
import styles from '../styles/Background.module.css';

import type { AppProps } from 'next/app';

interface Particle {
  x: number;
  y: number;
  speed: { x: number; y: number };
  color: string;
  update: (ctx: CanvasRenderingContext2D) => void;
}

function MyApp({ Component, pageProps }: AppProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pixelRatio = 7; // Increase this for more pixelation
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.scale(pixelRatio, pixelRatio);

    const particles: Particle[] = [];
    const speed = 2 * pixelRatio / 30;
    const period = 2000;

    function clear() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
    }

    function createParticle(x: number, y: number, speed: { x: number; y: number }, color: string): Particle {
      return {
        x,
        y,
        speed,
        color,
        update(ctx: CanvasRenderingContext2D) {
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 1;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          this.x += this.speed.x;
          this.y += this.speed.y;
          ctx.lineTo(this.x, this.y);
          ctx.stroke();

          const ang = Math.atan2(this.speed.y, this.speed.x);
          const mag = Math.sqrt(this.speed.x ** 2 + this.speed.y ** 2);
          const op = [ang + Math.PI / 4, ang - Math.PI / 4];
          if (Math.random() < 0.05) {
            const ch = Math.floor(Math.random() * op.length);
            this.speed.x = Math.cos(op[ch]) * mag;
            this.speed.y = Math.sin(op[ch]) * mag;
          }
        }
      };
    }

    function pulse() {
      setTimeout(pulse, period);
      const h = Math.random() < 0.4 ? 0 : 50; // Choose between red (0) and green (120)
      for (let i = 0; i < 56; i++) {
        particles.push(createParticle(
          canvas.width / (2 * pixelRatio),
          canvas.height / (2 * pixelRatio),
          {
            x: Math.cos(i / 8 * 2 * Math.PI) * speed,
            y: Math.sin(i / 8 * 2 * Math.PI) * speed
          },
          `hsl(${h},100%,50%)`
        ));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      clear();
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(ctx);
        if (particles[i].x < 0 || particles[i].x > canvas.width / pixelRatio || 
            particles[i].y < 0 || particles[i].y > canvas.height / pixelRatio) {
          particles.splice(i, 1);
          i--;
        }
      }
    }

    pulse();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.scale(pixelRatio, pixelRatio);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleStart = () => {
    setIsTransitioning(true);
  };

  return (
    <div className={"app-container"}>
      <canvas ref={canvasRef} className={styles.circuitCanvas} />
      {isLoading && <div className="loading-overlay" />}
      <Home isTransitioning={isTransitioning} />
      <GameStart onStart={handleStart} isTransitioning={isTransitioning} />
    </div>
  );
}

export default MyApp;