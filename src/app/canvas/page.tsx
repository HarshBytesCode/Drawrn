'use client'
import React, { useRef } from 'react'
import  { draw, MouseDown, MouseMove, MouseUp } from '../utils/draw'
import Bar from '../components/bar';
import UtilBar from '../components/util-bar'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeToolAtom, elementsAtom, isWritingAtom, moveableActiveElementAtom, strokeAtom, strokeStyleAtom, strokeWidthAtom } from '../utils/atom'
import TextInput from '../components/text-input'
import BoundingBox from '../components/bounding-box'


function Canvas() {
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useRecoilState(elementsAtom);
  const [moveableActiveElement, setMoveableActiveElement] = useRecoilState(moveableActiveElementAtom);
  const [tool, setTool] = useRecoilState(activeToolAtom);
  const [isWriting, setIsWriting] = useRecoilState(isWritingAtom);
  const stroke = useRecoilValue(strokeAtom);
  const strokeWidth = useRecoilValue(strokeWidthAtom);
  const strokeStyle = useRecoilValue(strokeStyleAtom);
  draw(canvasRef)
    
  return (
    <div>
      <canvas
      ref={canvasRef} 
      onMouseDown={(e) => MouseDown({e, tool,elements , setElements, setIsWriting,moveableActiveElement , setMoveableActiveElement, stroke, strokeWidth, strokeStyle})}
      onMouseUp={(e) => MouseUp({e, tool})}
      onMouseMove={(e) => MouseMove({e, tool, elements, setElements, stroke, strokeWidth, strokeStyle})}
      width={1920} 
      height={1200} 
      className='bg-black'
      />
      <Bar/>
      <TextInput canvasRef= {canvasRef}/>
      <BoundingBox/>
      <UtilBar/>
    </div>

  )
}

export default Canvas