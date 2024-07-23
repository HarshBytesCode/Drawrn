'use client'
import { useEffect, useState } from 'react';


function useClick() {
    const [mouse, setMouse] = useState<{active: boolean, x: number, y: number}>({active: false, x: 0, y: 0})
    useEffect(() => {

        const downMouse = (e) => {
            console.log(e);
            
            setMouse({active: true, x: e.clientX, y: e.clientY})
            
        }
        const upMouse = (e) => {
            setMouse({active: false, x: e.clientX, y: e.clientY})
            
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