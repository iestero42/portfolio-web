import React from 'react'

import './cmeter.css'
import { useEffect, useState } from 'react';


function Cmeter( { maxCount, dashoffset, duration }) {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (counter === maxCount) {
				clearInterval(interval);
			} else {
				setCounter(counter + 1);
			}
		}, duration);

		return () => clearInterval(interval);
	}, [counter, maxCount, duration]);

	return (
		<div className='skill-progress' key='Cmeter'>
			<div className='outer'>
				<div className='inner'>
					<div id='number'>{counter}%</div>
				</div>
			</div>

			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
				<circle style= { {	fill: "none",
									strokeWidth: "20px",
									strokeDasharray: "472",
									strokeDashoffset: "472", }
								 } cx="80" cy="80" r="70" stroke="url(#gradient)" strokeLinecap="round">
				<animate attributeName="stroke-dashoffset" from="472" to={dashoffset} dur="3s" fill='freeze'/> 
				</circle>
				<defs>
					<linearGradient id="gradient" gradientUnits='userSpaceOnUse' x1='-26.6618' y1='18.1384' x2='225.934' y2='186.649' gradientTransform='matrix(1 0 0 -1 0 206)'>
						<stop offset='0.4228' stopColor='#FF3333' />
						<stop offset='0.573' stopColor='#D32323' />
						<stop offset='0.7694' stopColor='#A01010' />
						<stop offset='0.9179' stopColor='#800404' />
						<stop offset='1' stopColor='#740000' />
					</linearGradient>
				</defs>
				</svg> 
		</div>
	);
}

export default Cmeter;