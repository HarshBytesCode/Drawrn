'use client'
import { MouseEvent, RefObject, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeToolAtom, elementsAtom } from "./atom";
import rough from 'roughjs';
import { createElement } from "./createElement";
const generator = rough.generator()
let activeElement:{id: number, x: number, y: number} | null;
let id = 1;


export const draw = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const [elements, setElements] = useRecoilState(elementsAtom)
  
  const [tool, setTool] = useRecoilState(activeToolAtom);
  const ctx = canvasRef.current?.getContext("2d");
  let rc:any;
  if(canvasRef.current){
    rc = rough.canvas(canvasRef.current)
  }
  // @ts-ignore
  ctx?.clearRect(0,0, canvasRef.current?.width, canvasRef.current?.height)
  elements.forEach((element: any) => {
    if(element) {
      rc.draw(element.roughElement)
    }
  })

  
  
}
// Fix type
export const MouseDown = ({e, tool, setElements}: {e:any, tool:string, setElements: any}) => {
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;
  
  if(tool === "SQUARE") {
    const roughElement = generator.rectangle(x,y, x-x, y-y, {stroke: 'white'});
    const element = {
      id: ++id ,
      startX: x,
      startY: y,
      roughElement
    }
    
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
    
  }

  if(tool === 'CLEAR') {
    setElements([])
    
  }
  
}
export const MouseMove = ({e, tool, elements , setElements}: {e:any, tool:string, elements:any, setElements: any}) => {
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;
  if(activeElement) {
    const copyElement = [...elements]
    
    copyElement[activeElement.id] = createElement({id, startX:activeElement.x, startY:activeElement.y, currentX: x, currentY: y});
    setElements(copyElement);
    
    
  }

  
}

export const MouseUp = ({e, tool}: {e:any, tool:string}) => {
  activeElement = null;
  
}
