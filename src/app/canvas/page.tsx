'use client'
import React, { useRef } from 'react'
import  { draw, MouseDown, MouseMove, MouseUp } from '../utils/draw'
import Bar from '../components/bar'
import { useRecoilState } from 'recoil'
import { activeToolAtom, elementsAtom } from '../utils/atom'


function Canvas() {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useRecoilState(elementsAtom);
  
  const [tool, setTool] = useRecoilState(activeToolAtom);
  draw(canvasRef)
    
  return (
    <div>
      <canvas
      ref={canvasRef} 
      onMouseDown={(e) => MouseDown({e, tool, setElements})}
      onMouseUp={(e) => MouseUp({e, tool})}
      onMouseMove={(e) => MouseMove({e, tool, elements, setElements})}
      width={1920} 
      height={1200} 
      className='bg-black'
      />
      <Bar/>
    </div>

  )
}

export default Canvas