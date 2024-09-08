'use client'
import { RefObject } from "react";
import rough from 'roughjs';
import { createElement } from "./createElement";
import setActiveElement from "./setActiveElement";
let activeElement:{id: number, x: number, y: number} | null;
let rc:any;

export const draw = ({canvasRef, elements, offset} : {
  canvasRef: RefObject<HTMLCanvasElement>,
  elements: any,
  offset: any
}) => {
  const ctx = canvasRef.current?.getContext("2d");

  if(canvasRef.current){
    rc = rough.canvas(canvasRef.current)
  }
  
  // @ts-ignore
  ctx?.clearRect(0,0, canvasRef.current?.width, canvasRef.current?.height)
  
  ctx?.save()
  ctx?.translate(
    offset.x,
    offset.y
  )
  
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

  ctx?.restore();
  
  
}

// Fix type
export const MouseDown = ({e, tool, elements , setElements, setIsWriting,moveableActiveElement, setMoveableActiveElement, stroke, strokeWidth, strokeStyle, offset}: {e:any, tool:string,elements:any , setElements: any, setIsWriting:any,moveableActiveElement: any , setMoveableActiveElement: any, stroke: string, strokeWidth: number, strokeStyle: number, offset: any}) => {
  const x = e.clientX - offset.x;
  const y = e.clientY - offset.y;
  let id: number = elements.length;
  
  if(tool === 'PAN') {
    activeElement = {id: 999999, x: e.clientX,y: e.clientY};
    return;
  }

  if(tool === 'PEN') {
    const element = createElement({id: id , startX:x, startY:y, type: tool, stroke, strokeWidth});
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
    return;
  }

  if(tool === 'SELECTION') {
    
    setActiveElement({elements, moveableActiveElement , setMoveableActiveElement, x, y })

    return;
  }

  if(tool === 'ARROW') {
    
    const element = createElement({id: id, startX:x, startY:y, currentX: x, currentY: y, type: tool, stroke, strokeWidth, strokeStyle })
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
    return;
  }
  
  if(tool === 'SQUARE') {
    const element = createElement({id: id, startX:x, startY:y, currentX: x - x, currentY: y - y, type: tool, stroke, strokeWidth, strokeStyle});
    
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
    return;
    
  }

  if(tool === 'CIRCLE') {
    const element = createElement({id: id, startX: x, startY: y, currentX: x, currentY: y, type: tool, stroke, strokeWidth, strokeStyle})
    setElements((prev: []) => [...prev, element]);
    activeElement = {id,x,y};
    return;
  }

  if( tool === 'ERASER') {
    activeElement = {id: 9999999, x:0, y:0}
    return;
  }
  
}

export const MouseMove = ({e, tool, elements , setElements, stroke, strokeWidth, strokeStyle, offset, setOffset, undoList, setUndoList}: {e:any, tool:string, elements:any, setElements: any, stroke: string, strokeWidth: number, strokeStyle: number,offset:any, setOffset: any, undoList: any, setUndoList: any}) => {
  const x = e.clientX - offset.x;
  const y = e.clientY - offset.y;
  
  if(activeElement) {
    const copyElement = [...elements];
    
    if(tool === 'PAN') {
      const dx = e.clientX - activeElement.x;
      const dy = e.clientY - activeElement.y;
      
      setOffset({
        x: offset.x + dx,
        y: offset.y + dy,
      });
      activeElement.x = e.clientX;
      activeElement.y = e.clientY;
      
      return;
    }

    if(tool == 'PEN') {
      copyElement[activeElement.id] = createElement({id: activeElement.id, startX:x, startY:y, type: tool, stroke, strokeWidth});
      setElements(copyElement)

      return;
    }

    if(tool == 'ARROW') {
      copyElement[activeElement.id] = createElement({id: activeElement.id, startX:activeElement.x, startY:activeElement.y, currentX: x, currentY: y, type: tool, stroke, strokeWidth, strokeStyle});
      setElements(copyElement)

      return;
    }
    
    if(tool === 'SQUARE' && activeElement && copyElement) {
      copyElement[activeElement.id] = createElement({id: activeElement.id, startX:activeElement.x, startY:activeElement.y, currentX: x - activeElement.x, currentY: y - activeElement.y, type: tool, stroke, strokeWidth, strokeStyle});
      setElements(copyElement);

      return;
    }

    if(tool === 'CIRCLE' && activeElement && copyElement) {
      copyElement[activeElement.id] = createElement({id: activeElement.id, startX:activeElement.x, startY:activeElement.y, currentX: x, currentY: y, type: tool, stroke, strokeWidth, strokeStyle});
      setElements(copyElement);

      return;
    }

    if(tool === 'ERASER' && activeElement && copyElement) {
      let removableElement: any;
      elements.forEach((element: any) => {
        if(!element) return
        if(element.type === 'SQUARE') {
    
          if(element.startX <= x && 
          x <= element.startX + element.width && 
          element.startY <= y && 
          y <= element.startY + element.height ) {
            removableElement = element; 
            return; 
          }
        }

        if(element.type === 'ARROW') {
            
          let startY, endY;
          if(element.startY < element.endY) startY = element.startY;
          else startY = element.endY;
          if(element.endY > element.startY) endY = element.endY;
          else endY = element.startY;

          if(element.startX <= x && x <= element.endX && startY <= y && y <= endY ) {
            removableElement = element;  
            return;
          }
        }

        if(element.type === 'CIRCLE') {
            
          const rx = Math.abs(element.width);
          const ry = Math.abs(element.height);
          const dx = x - element.startX;
          const dy = y - element.startY
          
          const circleArea = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry)

          if(circleArea <= 1) {
            removableElement = element;  
            return;
          }
        }

        if(element.type === 'TEXT') {
          const width = element.startX + element.text.length * 12
          
          if(element.startX <= x && x <= width && y <= element.startY && y >= element.startY - 20 ) {
            removableElement = element;
            return;  
          }
        }
      })
      if(!removableElement) return;
      
      const filtered = copyElement.filter((element) => element.id !== removableElement.id);
      setElements(filtered);
      setUndoList([removableElement, ...undoList])
      
    }
    
  }
  
  
}

export const MouseUp = ({e, tool}: {e:any, tool:string}) => {
  
  if(tool === 'PEN') {
    createElement({type: tool, empty: true})
  }
  activeElement = null;
  
}
