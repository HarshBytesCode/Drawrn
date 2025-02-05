"use client"
import React, { useEffect, useRef, useState } from 'react'
import  { draw, MouseDown, MouseMove, MouseUp } from '../utils/draw'
import Bar from '../components/bar';
import UtilBar from '../components/util-bar'
import { useRecoilState, useRecoilValue } from 'recoil'
import { activeToolAtom, elementsAtom, isWritingAtom, moveableActiveElementAtom, offsetAtom, strokeAtom, strokeStyleAtom, strokeWidthAtom, undoListAtom } from '../utils/atom'
import TextInput from '../components/text-input'
import BoundingBox from '../components/bounding-box'
import Undo_Redo from '../components/undo-redo';


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
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const [undoList, setUndoList] = useRecoilState(undoListAtom);

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    })

    if(canvasRef.current) {
      if(tool === 'ERASER') canvasRef.current.style.cursor = "url(/eraser.png), auto";
      else if(tool === 'PAN') canvasRef.current.style.cursor = "url(/open-hand.png), auto";
      else if(tool === 'SELECTION') canvasRef.current.style.cursor = "default"
      else canvasRef.current.style.cursor = "crosshair";
    }
  }, [window.innerWidth, window,innerHeight, tool, canvasRef.current])
  
  useEffect(()=> {
    draw({canvasRef, elements, offset})
  },[elements])

  if(dimensions.width === 0) {
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
      onMouseMove={(e) => MouseMove({e, tool, elements, setElements, stroke, strokeWidth, strokeStyle, offset, setOffset, undoList, setUndoList})}
      className='bg-black cursor-crosshair'
      />
      <Bar/>
      <TextInput canvasRef= {canvasRef}/>
      <BoundingBox/>
      <UtilBar/>
      <Undo_Redo/>
    </div>

  )
}

export default Canvas