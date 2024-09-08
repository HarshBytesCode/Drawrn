'use client'
import { CaseUpper, Circle, Eraser, Hand, Minus, MousePointer, MoveUpRight, Pen, Square, Trash2 } from 'lucide-react'
import React from 'react'
import {activeToolAtom, elementsAtom, isWritingAtom, moveableActiveElementAtom} from '../utils/atom'
import { useRecoilState } from 'recoil';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
function Bar() {
  const [tool, setTool] = useRecoilState(activeToolAtom);
  const [isWriting, setIsWriting] = useRecoilState(isWritingAtom);
  const [elements, setElements] = useRecoilState(elementsAtom);
  const [moveableActiveElement, setMoveableActiveElement] = useRecoilState(moveableActiveElementAtom);
  
  useGSAP(() => {
    gsap.to("#main", {
      y: 20,
      delay: 0.5,
      opacity: 100,
      duration: 1,
    })
    gsap.from("#main > *", {
      stagger: 0.2,
      opacity: 0,
      delay: 1,
      y: -20
    })
  })

  return (
    <div id='main' className='flex justify-center items-center space-x-2 fixed top-0 left-[37%] text-white opacity-0 bg-gray-900 p-1 rounded-lg z-50'
    onClick={() => {
      setMoveableActiveElement(null)
      setIsWriting(false)}}
    >
      <Hand
      size={40}
      strokeWidth={2} 
      className={` hover:bg-gray-950 ${tool === "PAN" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
      onClick={() => setTool('PAN')}
      />
      <Pen 
      size={40}
      strokeWidth={2} 
      className={` hover:bg-gray-950 ${tool === "PEN" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
      onClick={() => setTool('PEN')}
      />
      <MousePointer 
      size={40}
      strokeWidth={2} 
      className={` hover:bg-gray-950 ${tool === "SELECTION" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
      onClick={() => setTool('SELECTION')}
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
      className={` hover:bg-gray-950 ${tool === "ERASER" ? 'bg-purple-400/30': ''} p-2 rounded-lg`}
      onClick={() => {
        setTool('ERASER')
      }}
      />
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