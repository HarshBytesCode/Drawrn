'use client'
import { CaseUpper, Circle, Eraser, Minus, MousePointer, MoveUpRight, Pen, Square, Trash2 } from 'lucide-react'
import React from 'react'
import {activeToolAtom, elementsAtom, isWritingAtom} from '../utils/atom'
import { useRecoilState } from 'recoil';
function Bar() {
  const [tool, setTool] = useRecoilState(activeToolAtom);
  const [isWriting, setIsWriting] = useRecoilState(isWritingAtom);
  const [elements, setElements] = useRecoilState(elementsAtom);
  
  return (
    <div className='flex justify-center items-center space-x-2 fixed top-5 left-[40%] text-white bg-gray-900 p-1 rounded-lg z-50'
    onClick={() => setIsWriting(false)}
    >
        <Pen 
        size={40}
        strokeWidth={2} 
        className={` hover:bg-gray-950 ${tool === "PEN" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
        onClick={() => setTool('PEN')}
        />
        <MousePointer 
        size={40}
        strokeWidth={2} 
        className={` hover:bg-gray-950 ${tool === "MOVE" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
        onClick={() => setTool('MOVE')}
        />
        <Minus 
        size={40} 
        strokeWidth={2} 
        className={` hover:bg-gray-950 ${tool === "ARROW" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
        onClick={() => setTool('ARROW')}
        />
        <Square 
        size={40} 
        strokeWidth={2} 
        className={` hover:bg-gray-950 ${tool === "SQUARE" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
        onClick={() => setTool('SQUARE')}
        />
        <Circle 
        size={40} 
        strokeWidth={2} 
        className={` hover:bg-gray-950 ${tool === "CIRCLE" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
        onClick={() => setTool('CIRCLE')}
        />
        <CaseUpper 
        size={40} 
        strokeWidth={2} 
        className={` hover:bg-gray-950 ${tool === "TEXT" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
        onClick={() => {
          setTool('TEXT');
        }}
        />
        <Eraser 
        size={40} 
        strokeWidth={2} 
        className={` hover:bg-gray-950 ${tool === "ERASER" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}/>
        <Trash2 
        size={40} 
        strokeWidth={2} 
        className={` hover:bg-gray-950 ${tool === "CLEAR" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
        onClick={() => setElements([])}
        />
    </div>
  )
}

export default Bar