'use client'
import { RefObject } from "react";
import { useRecoilState } from "recoil";
import {  elementsAtom } from "./atom";
import rough from 'roughjs';
import { createElement } from "./createElement";
import setActiveElement from "./setActiveElement";
let activeElement:{id: number, x: number, y: number} | null;
let rc:any;

export const draw = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [elements, setElements] = useRecoilState(elementsAtom);
  const ctx = canvasRef.current?.getContext("2d");

  if(canvasRef.current){
    rc = rough.canvas(canvasRef.current)
  }

  // @ts-ignore
  ctx?.clearRect(0,0, canvasRef.current?.width, canvasRef.current?.height)

  elements.forEach((element: any) => {

    if(!element) {
      return
    }
    if(element.type === 'PEN') {
      element.roughElementArray.forEach((subelement:any) => {
        rc.draw(subelement)
      })
    }

    if(element.type === 'ARROW') {
      rc.draw(element.roughElement)
    }

    if(element.type === 'SQUARE') {
      rc.draw(element.roughElement)
    }

    if(element.type === 'CIRCLE') {
      rc.draw(element.roughElement)
    }

    if(element.type === 'TEXT') {
      if(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = "20px Courier";
        ctx.fillText(element.text, element.startX, element.startY)

      }
      
    }
  })
  
  
}

// Fix type
export const MouseDown = ({e, tool, elements , setElements, setIsWriting,moveableActiveElement, setMoveableActiveElement, stroke, strokeWidth, strokeStyle}: {e:any, tool:string,elements:any , setElements: any, setIsWriting:any,moveableActiveElement: any , setMoveableActiveElement: any, stroke: string, strokeWidth: number, strokeStyle: number}) => {
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;
  let id: number;
  if(elements.length === 0) {
    id = elements.length + 1
  } else id = elements.length
  

  if(tool ==='PEN') {
    const element = createElement({id: id , startX:x, startY:y, type: tool, stroke, strokeWidth});
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
  }

  if(tool === 'SELECTION') {
    
    setActiveElement({elements, setElements,moveableActiveElement , setMoveableActiveElement, x, y })
  }

  if(tool === 'ARROW') {
    
    const element = createElement({id: id, startX:x, startY:y, currentX: x, currentY: y, type: tool, stroke, strokeWidth, strokeStyle })
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
  }
  
  if(tool === 'SQUARE') {
    const element = createElement({id: id, startX:x, startY:y, currentX: x - x, currentY: y - y, type: tool, stroke, strokeWidth, strokeStyle});
    
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
    
  }

  if(tool === 'CIRCLE') {
    const element = createElement({id: id, startX: x, startY: y, currentX: x, currentY: y, type: tool, stroke, strokeWidth, strokeStyle})
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
  }
  
}

export const MouseMove = ({e, tool, elements , setElements, stroke, strokeWidth, strokeStyle}: {e:any, tool:string, elements:any, setElements: any, stroke: string, strokeWidth: number, strokeStyle: number}) => {
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;
  if(activeElement) {
    const copyElement = [...elements]

    if(tool == 'PEN') {
      copyElement[activeElement.id] = createElement({id: activeElement.id, startX:x, startY:y, type: tool, stroke, strokeWidth});
      setElements(copyElement)
    }

    if(tool == 'ARROW') {
      copyElement[activeElement.id] = createElement({id: activeElement.id, startX:activeElement.x, startY:activeElement.y, currentX: x, currentY: y, type: tool, stroke, strokeWidth, strokeStyle});
      setElements(copyElement)
    }
    
    if(tool === 'SQUARE' && activeElement && copyElement) {
      copyElement[activeElement.id] = createElement({id: activeElement.id, startX:activeElement.x, startY:activeElement.y, currentX: x - activeElement.x, currentY: y - activeElement.y, type: tool, stroke, strokeWidth, strokeStyle});
      setElements(copyElement);
    }

    if(tool === 'CIRCLE' && activeElement && copyElement) {
      copyElement[activeElement.id] = createElement({id: activeElement.id, startX:activeElement.x, startY:activeElement.y, currentX: x, currentY: y, type: tool, stroke, strokeWidth, strokeStyle});
      setElements(copyElement);
    }
    
    
  }
  
  
}

export const MouseUp = ({e, tool}: {e:any, tool:string}) => {
  
  if(tool === 'PEN') {
    createElement({type: tool, empty: true})

  }
  activeElement = null;
  
}
