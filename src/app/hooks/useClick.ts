'use client'
import { useEffect, useState } from 'react';


function useClick() {
    const [mouse, setMouse] = useState(false)
    useEffect(() => {

        const downMouse = () => {
            setMouse(true)
            
        }
        const upMouse = () => {
            setMouse(false)
            
        }

        window.addEventListener('mousedown', downMouse);
        window.addEventListener('mouseup', upMouse)
        return () => {
            window.removeEventListener('mousedown', downMouse);
            window.removeEventListener('mouseup', upMouse)
        };

    }, []);
    return mouse;
  
}

export default useClick