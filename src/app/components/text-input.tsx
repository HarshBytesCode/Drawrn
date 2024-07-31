import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { activeToolAtom, elementsAtom, isWritingAtom } from '../utils/atom'
import { createElement } from '../utils/createElement';
let x:number | null,y:number | null;
function TextInput({canvasRef}: any) {
    const [isWriting, setIsWriting] = useRecoilState(isWritingAtom);
    const [elements, setElements] = useRecoilState(elementsAtom);
    const [tool, setTool] = useRecoilState(activeToolAtom);
    const inputRef = useRef<HTMLInputElement>(null);
    let id: number;
    if(elements.length === 0) {
        id = elements.length + 1
    } else id = elements.length

    setTimeout(() => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }, 0);

    function blur(e: any) {
        setIsWriting(false)
        if(!e.target.value){
            x= null;
            y= null;
           return

        }
        if(x && y) {
            const element = {id, startX: x + window.scrollX, startY: y + window.scrollY + 5, text: e.target.value, width: e.target.value.length*12, height: 15, type: 'TEXT'}
            // @ts-ignore
            setElements([...elements, element ])
            e.target.value = ''
            x= null;
            y= null;
        }
        
    }

    useEffect(() => {

        const handleMouseDown = (e: MouseEvent) => {
            if(tool === 'TEXT') {
                setIsWriting(true)
                if(!x && !y) {
                    
                    x = e.clientX 
                    y = e.clientY
                }
            }
            else {
                setIsWriting(false)
            }
            
        }
      
        canvasRef.current.addEventListener('mousedown', handleMouseDown )
    
      return () => {

        canvasRef.current.removeEventListener('mousedown', handleMouseDown )
      }
    }, [tool])

  return (
    <input 
    ref={inputRef}
    onBlur={blur}
    style={{
        top: y ? `${y - 15}px` : 'auto',
        left: x ? `${x}px` : 'auto',
    }} 
    className={`${isWriting ? 'fixed block' : 'hidden'} font-mono w-[70vw] text-[20px] bg-transparent outline-none z-40 text-white`}></input>
  )
}

export default TextInput