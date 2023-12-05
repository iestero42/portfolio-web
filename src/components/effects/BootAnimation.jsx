import React, { useState, useEffect } from 'react';

const BootAnimation = () => {
    const [displayText, setDisplayText] = useState('');
	const [isFinished, setIsFinished] = useState(false);
	const [animationClass, setAnimationClass] = useState('');
	const [showWelcome, setShowWelcome] = useState(false);
	const isPageReloaded = () => {
        const navigationEntries = performance.getEntriesByType("navigation");
        if (navigationEntries.length > 0) {
            const navigationEntry = navigationEntries[0];
            return navigationEntry.type === 'reload';
        }
        return false;
    };
    const lines = [
		"BOOTING SYSTEM...",
		"CHECKING HARDWARE MODULE 1...",
		"CHECKING HARDWARE MODULE 2...",
		"CHECKING HARDWARE MODULE 3...",
		"CHECKING HARDWARE MODULE 10...",
		"LOADING DRIVER 1...",
		"LOADING DRIVER 10...",
		"INITIALIZING NETWORK INTERFACE 1...",
		"INITIALIZING NETWORK INTERFACE 5...",
		"SETTING UP USER ENVIRONMENT 1...",
		"SETTING UP USER ENVIRONMENT 5...",
		"STARTING SERVICES 1...",
		"STARTING SERVICES 10...",
		"PERFORMING FINAL CHECKS...",
		"UPDATING SYSTEM TIME...",
		"RUNNING DIAGNOSTIC CHECKS...",
		"MOUNTING FILE SYSTEMS...",
		"APPLYING SECURITY PATCHES...",
		"CONFIGURING USER INTERFACES...",
		"INITIALIZING GRAPHICS ENGINE...",
		"SYSTEM READY."
	];

    let currentLine = 0;
    let currentChar = 0;
    const typeLine = () => {
        if (currentLine < lines.length) {
            let line = lines[currentLine];
            if (currentChar < line.length) {
                setDisplayText(prev => prev + line[currentChar]);
                currentChar++;
                setTimeout(typeLine, 30); // Ajusta la velocidad de "escritura"
            } else {
                setDisplayText(prev => prev + '\n');
                currentChar = 0;
                currentLine++;
                if (currentLine < lines.length) {
                    setTimeout(typeLine, 50); // Retraso antes de la siguiente línea
                } else {
                    setTimeout(() => setShowWelcome(true), 1000); // Mostrar mensaje de bienvenida
                }
            }
        }
    }

	useEffect(() => {
        if (isPageReloaded()) {
            setIsFinished(true);
        } else {
            document.body.style.overflow = 'hidden';
            typeLine();
        }
    }, [setIsFinished]);

	useEffect(() => {
		if (showWelcome && !isFinished) {
		  const timer = setTimeout(() => {
			setAnimationClass('fade-out');
		  }, 2000);
	
		  return () => clearTimeout(timer);
		}
	  }, [showWelcome, isFinished]);

	useEffect(() => {
		if (animationClass === 'fade-out' && !isFinished) {
		  const timer = setTimeout(() => {
			document.body.style.overflow = 'auto';
			setIsFinished(true);
		  }, 1000); 
	  
		  return () => clearTimeout(timer);
		}
	  }, [animationClass, isFinished]);


	if (isFinished) {
		document.body.style.overflow = 'auto';
        return null;
    }
    return (
        	<div className={`boot-animation ${animationClass}`}>
            	<div style={{width: "100%", height: "100%", position:"absolute"}}>
					{!showWelcome ? displayText : (
               			<div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignContent: "center", color: 'white', fontSize: '52px', textAlign: 'center', width: "100%", height: "100%"}}>
                    		<div style={{width: "100%", height: "50%"}}>
								LAUNCHING
							</div>
                		</div>
            		)}
				</div>
        	</div>
    	);
};

export default BootAnimation;