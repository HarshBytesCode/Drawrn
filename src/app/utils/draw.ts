'use client'
import { RefObject } from "react";
import { useRecoilState } from "recoil";
import { activeToolAtom, elementsAtom } from "./atom";
import rough from 'roughjs';
import { createElement } from "./createElement";
let activeElement:{id: number, x: number, y: number} | null;
let id = 1;
let rc:any;

export const draw = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [elements, setElements] = useRecoilState(elementsAtom);
  const [tool, setTool] = useRecoilState(activeToolAtom);


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
    if(element.type == 'PEN') {
      element.roughElementArray.forEach((subelement:any) => {
        rc.draw(subelement)
      })
    }
    if(element.type == 'SQUARE') {
      rc.draw(element.roughElement)
    }
    if(element.type == 'CIRCLE') {
      rc.draw(element.roughElement)
    }
  })
  
  
}

// Fix type
export const MouseDown = ({e, tool, setElements}: {e:any, tool:string, setElements: any}) => {
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;
  
  if(tool ==='PEN') {
    const element = createElement({id: ++id, startX:x, startY:y, type: tool});
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
  }
  
  if(tool === 'SQUARE') {
    const element = createElement({id: ++id, startX:x, startY:y, currentX: x, currentY: y, type: tool});
    
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
    
  }

  if(tool === 'CIRCLE') {
    const element = createElement({id: ++id, startX: x, startY: y, currentX: x, currentY: y, type: tool})
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
  }
  
}
export const MouseMove = ({e, tool, elements , setElements}: {e:any, tool:string, elements:any, setElements: any}) => {
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;
  if(activeElement) {
    const copyElement = [...elements]

    if(tool == 'PEN') {
      copyElement[activeElement.id] = createElement({id: ++id, startX:x, startY:y, type: tool});
      setElements(copyElement)
    }
    
    if(tool === 'SQUARE' && activeElement && copyElement) {
      copyElement[activeElement.id] = createElement({id, startX:activeElement.x, startY:activeElement.y, currentX: x, currentY: y, type: tool});
      setElements(copyElement);
    }

    if(tool === 'CIRCLE' && activeElement && copyElement) {
      copyElement[activeElement.id] = createElement({id, startX:activeElement.x, startY:activeElement.y, currentX: x, currentY: y, type: tool});
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
