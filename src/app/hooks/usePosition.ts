'use client'
import { useEffect, useState } from 'react';


function usePosition() {
    const [position, setPosition] = useState<{x: number, y: number} | null>(null)

    useEffect(() => {
      

        window.addEventListener('mousedown', (e) => {
            const x = e.clientX 
            const y = e.clientY
            setPosition({x,y})
        })
    
      return () => {
        window.removeEventListener('mousedown', ()=> {})
      }
    }, [])
    

    return position;
    
  
}

export default usePosition