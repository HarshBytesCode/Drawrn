"use client"
import React, { useEffect, useRef, useState } from 'react'
import  { draw, MouseDown, MouseMove, MouseUp } from '../utils/draw'
import Bar from '../components/bar';
import UtilBar from '../components/util-bar'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeToolAtom, elementsAtom, isWritingAtom, moveableActiveElementAtom, offsetAtom, strokeAtom, strokeStyleAtom, strokeWidthAtom } from '../utils/atom'
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
  const [offset, setOffset] = useRecoilState(offsetAtom);
  const [dimentions, setDimentions] = useState({width: 0, height: 0})

  useEffect(() => {
    setDimentions({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [window.innerWidth, window,innerHeight])
  

  draw({canvasRef, elements, offset})

  if(dimentions.width === 0) {
    return (
      <div>
        Loading..
      </div>
    )
  }
    
  return (
    <div>
      <canvas
      ref={canvasRef}
      width={window.innerWidth} 
      height={window.innerHeight}
      onMouseDown={(e) => MouseDown({e, tool,elements , setElements, setIsWriting,moveableActiveElement , setMoveableActiveElement, stroke, strokeWidth, strokeStyle, offset})}
      onMouseUp={(e) => MouseUp({e, tool})}
      onMouseMove={(e) => MouseMove({e, tool, elements, setElements, stroke, strokeWidth, strokeStyle, offset, setOffset})}
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