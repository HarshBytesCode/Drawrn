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

    setTimeout(() => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }, 0);

    function blur(e: any) {
        setIsWriting(false)
        if(!e.target.value){
           return
        }
        if(x && y) {
            const element = {startX: x + window.scrollX, startY: y + window.scrollY, text: e.target.value, type: 'TEXT'}
            // @ts-ignore
            setElements([...elements, element ])
            e.target.value = ''
            x= null;
            y= null;
        }
        
    }

    useEffect(() => {
      
        canvasRef.current.addEventListener('mousedown', (e: MouseEvent) => {
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
            
        })
    
      return () => {
        canvasRef.current.removeEventListener('mousedown', ()=> {})
      }
    }, [tool])

  return (
    <input 
    ref={inputRef}
    onBlur={blur}
    style={{
        top: y ? `${y - 18}px` : 'auto',
        left: x ? `${x - 15}px` : 'auto',
    }} 
    className={`${isWriting ? 'fixed block' : 'hidden'} font-mono w-[70vw] text-xl bg-transparent outline-none text-white p-2`}></input>
  )
}

export default TextInput