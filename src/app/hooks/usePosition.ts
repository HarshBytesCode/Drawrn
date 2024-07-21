'use client'
import { useEffect, useState } from 'react';


function usePosition() {
    const [position, setPosition] = useState<{x: number, y: number} | null>(null)
    const [velocity, setVelocity] = useState<number>(1)
    let lastX:number | null, lastY:number | null, lastTime:number | null;
    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({x: e.clientX, y: e.clientY})
            getvelocity(e)
        };

        const getvelocity = (e: MouseEvent) => {
            const currentTime = performance.now()

            if(lastX && lastY && lastTime) {
                const dx = e.clientX - lastX;
                const dy = e.clientY - lastY;
                const dt = currentTime - lastTime;
                
                const distance = Math.sqrt(dx*dx + dy*dy);
                const velocity = distance/dt;
                if(velocity > 1 && velocity < 3) setVelocity(velocity);
                
            }
            lastX = e.clientX;
            lastY = e.clientY;
            lastTime = currentTime;

        }

        window.addEventListener('mousemove', updatePosition);
        return () => {
            window.removeEventListener('mousemove', updatePosition);
        };

    }, []);
    return {position, velocity};
  
}

export default usePosition