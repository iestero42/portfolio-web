import { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import GameStart from '../components/GameStart';
import Terminal from '../components/Terminal';
import '../styles/global.css';
import Background from '@/components/Background';

function MyApp() {
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

  const handleStart = () => {
    setIsTransitioning(true);
  };

  return (
    <div className={"app-container"}>
      <Background />
      {isLoading && <div className="loading-overlay" />}
      <Terminal isVisible={isTransitioning} />
      <GameStart onStart={handleStart} isTransitioning={isTransitioning} />
    </div>
  );
}

export default MyApp;