'use client'
import React, { useEffect, useRef, useState } from 'react'
import { elementsAtom, moveableActiveElementAtom } from '../utils/atom';
import { useRecoilState } from 'recoil';
import { createElement } from '../utils/createElement';
let onClickX, onClickY;



function BoundingBox() {

  const [isMoving, setIsMoving] = useState(false);
  const [elements, setElements] = useRecoilState(elementsAtom);
  const [moveableActiveElement, setMoveableActiveElement] = useRecoilState<any>(moveableActiveElementAtom);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [resizingDirection, setResizingDirection] = useState('');
  const resizeComp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (moveableActiveElement) {
      setWidth(moveableActiveElement.width);
      setHeight(moveableActiveElement.height);
      setStartX(moveableActiveElement.startX);
      setStartY(moveableActiveElement.startY)
    }
  }, [moveableActiveElement]);


  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      
      if(isMoving) {
        let newWidth = width;
        let newHeight = height;

        if(moveableActiveElement.type === 'SQUARE') {

          switch (resizingDirection) {
            case 'se':
              newWidth = e.clientX - startX; 
              newHeight = e.clientY - startY;
  
              if(newWidth < 0) {
                setResizingDirection("sw")
              }
              if(newHeight < 0) setResizingDirection("ne");
              break;
            case 'ne':
              newWidth = e.clientX - startX;
              newHeight = height - (e.clientY - startY);
              setStartY(e.clientY);
              if(newWidth < 0) {
                setResizingDirection("nw")
              }
              if(newHeight < 0) setResizingDirection("se");
              break;
            case 'sw':
              newWidth = width - (e.clientX - startX)
              newHeight = e.clientY - startY
              setStartX(e.clientX)
              if(newWidth < 0) {
                setResizingDirection("se")
              }
              if(newHeight < 0) setResizingDirection("nw");
              break;
            case 'nw':
              newWidth = width - (e.clientX - startX);
              newHeight = height - (e.clientY - startY);
              setStartX(e.clientX);
              setStartY(e.clientY);
              if(newWidth < 0) {
                setResizingDirection("ne")
              }
              if(newHeight < 0) setResizingDirection("sw");
              break;
            default:
              break;
          }
            
          setWidth(newWidth);
          setHeight(newHeight);
  
          const copyElement = [...elements];
  
          copyElement[moveableActiveElement.id] = createElement({
            id: moveableActiveElement.id, 
            startX:startX, 
            startY:startY, 
            currentX: width, 
            currentY: height, 
            type: moveableActiveElement.type
          });

          setElements(copyElement);
        }

        if(moveableActiveElement.type === 'CIRCLE') {

          switch (resizingDirection) {
            case 'se':
              newWidth = e.clientX - startX; 
              newHeight = e.clientY - startY;
  
              if(newWidth < 0) {
                setResizingDirection("sw")
              }
              if(newHeight < 0) setResizingDirection("ne");
              break;
            case 'ne':
              newWidth = e.clientX - startX;
              newHeight = height - (e.clientY - startY);
              setStartY(e.clientY);
              if(newWidth < 0) {
                setResizingDirection("nw")
              }
              if(newHeight < 0) setResizingDirection("se");
              break;
            case 'sw':
              newWidth = width - (e.clientX - startX)
              newHeight = e.clientY - startY
              setStartX(e.clientX)
              if(newWidth < 0) {
                setResizingDirection("se")
              }
              if(newHeight < 0) setResizingDirection("nw");
              break;
            case 'nw':
              newWidth = width - (e.clientX - startX);
              newHeight = height - (e.clientY - startY);
              setStartX(e.clientX);
              setStartY(e.clientY);
              if(newWidth < 0) {
                setResizingDirection("ne")
              }
              if(newHeight < 0) setResizingDirection("sw");
              break;
            default:
              break;
          }
            
          setWidth(newWidth);
          setHeight(newHeight);
  
          const copyElement = [...elements];
          
          copyElement[moveableActiveElement.id] = createElement({
            id: moveableActiveElement.id, 
            startX: startX, 
            startY: startY, 
            currentX: width + startX, 
            currentY: height + startY, 
            type: moveableActiveElement.type
          });

          setElements(copyElement);
        }

        if(moveableActiveElement.type === 'ARROW') {

          switch (resizingDirection) {
            case 'se':
              newWidth = e.clientX - startX; 
              newHeight = e.clientY - startY;
  
              if(newWidth < 0) {
                setResizingDirection("sw")
              }
              if(newHeight < 0) setResizingDirection("ne");
              break;
            case 'ne':
              newWidth = e.clientX - startX;
              newHeight = height - (e.clientY - startY);
              setStartY(e.clientY);
              if(newWidth < 0) {
                setResizingDirection("nw")
              }
              if(newHeight < 0) setResizingDirection("se");
              break;
            case 'sw':
              newWidth = width - (e.clientX - startX)
              newHeight = e.clientY - startY
              setStartX(e.clientX)
              if(newWidth < 0) {
                setResizingDirection("se")
              }
              if(newHeight < 0) setResizingDirection("nw");
              break;
            case 'nw':
              newWidth = width - (e.clientX - startX);
              newHeight = height - (e.clientY - startY);
              setStartX(e.clientX);
              setStartY(e.clientY);
              if(newWidth < 0) {
                setResizingDirection("ne")
              }
              if(newHeight < 0) setResizingDirection("sw");
              break;
            default:
              break;
          }
            
          setWidth(newWidth);
          setHeight(newHeight);
  
          const copyElement = [...elements];
  
          copyElement[moveableActiveElement.id] = createElement({
            id: moveableActiveElement.id, 
            startX:startX, 
            startY:startY, 
            currentX: width + startX, 
            currentY: height + startY, 
            type: moveableActiveElement.type
          });

          setElements(copyElement);
        }

        if(moveableActiveElement.type === 'TEXT') {

          switch (resizingDirection) {
            case 'move':
            
            break;
            default:
              break;
          }
            
          setWidth(newWidth);
          setHeight(newHeight);
  
          const copyElement = [...elements];
  
          copyElement[moveableActiveElement.id] = {
            id: moveableActiveElement.id, 
            startX: startX, 
            startY: startY + 5, 
            text: moveableActiveElement.text, 
            width: moveableActiveElement.text.length*12, 
            height: 18, 
            type: 'TEXT'
          }

          setElements(copyElement);
        }




        
        

      }
      
      
    }
    function handleMouseUp(e: MouseEvent) {
      setIsMoving(false)
      setResizingDirection('')
      
    }
    
    if(resizeComp.current) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
  }, [isMoving, elements, resizingDirection, width, height, startX, startY])
  
  function handleMouseDown({e, direction}: any) {
    setResizingDirection(direction)
    setIsMoving(true)
    
  }




  return (
    <div
    ref={resizeComp} 
    style={{
      top: `${ moveableActiveElement?.type == 'CIRCLE' ? startY - height/2 - 10 :startY - 10}px` ,
      left: `${moveableActiveElement?.type == 'CIRCLE' ? startX - width/2 - 10 :startX - 10}px`,
      width: `${Math.abs(width) + 20}px`,
      height: `${Math.abs(height) + 20}px`,
    }}
    className={`${moveableActiveElement ? 'absolute' : 'hidden'} bg-transparent border z-50 border-lime-500 cursor-move`}
    >
        <div
        onMouseDown={(e) => handleMouseDown({e:e, direction: 'nw'})}
        className='absolute p-[3px] -top-[5px] -left-[5px] bg-black border border-lime-500 rounded-sm cursor-nw-resize '/>
        <div
        onMouseDown={(e) => handleMouseDown({e:e, direction: 'ne'})} className='absolute p-[3px] -top-[5px] -right-[5px] bg-black border border-lime-500 cursor-ne-resize '/>
        <div
        onMouseDown={(e) => handleMouseDown({e:e, direction: 'sw'})} className='absolute p-[3px] -bottom-[5px] -left-[5px] bg-black border border-lime-500 cursor-sw-resize'/>
        <div
        onMouseDown={(e) => handleMouseDown({e:e, direction: 'se'})} className='absolute p-[3px] -bottom-[5px] -right-[5px] bg-black border border-lime-500 cursor-se-resize '/>
    </div>
  )
  

}

export default BoundingBox