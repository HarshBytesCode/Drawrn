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
        const clientX = e.clientX + window.scrollX;
        const clientY = e.clientY + window.scrollY;
        if(moveableActiveElement?.type === 'SQUARE') {

          switch (resizingDirection) {
            case 'move':
              setStartX(clientX);
              setStartY(clientY);
              break;
            case 'se':
              newWidth = clientX - startX; 
              newHeight = clientY - startY;
  
              if(newWidth < 0) {
                setResizingDirection("sw")
              }
              if(newHeight < 0) setResizingDirection("ne");
              break;
            case 'ne':
              newWidth = clientX - startX;
              newHeight = height - (clientY - startY);
              setStartY(clientY);
              if(newWidth < 0) {
                setResizingDirection("nw")
              }
              if(newHeight < 0) setResizingDirection("se");
              break;
            case 'sw':
              newWidth = width - (clientX - startX)
              newHeight = clientY - startY
              setStartX(clientX)
              if(newWidth < 0) {
                setResizingDirection("se")
              }
              if(newHeight < 0) setResizingDirection("nw");
              break;
            case 'nw':
              newWidth = width - (clientX - startX);
              newHeight = height - (clientY - startY);
              setStartX(clientX);
              setStartY(clientY);
              if(newWidth < 0) {
                setResizingDirection("ne")
              }
              if(newHeight < 0) setResizingDirection("sw");
              break;
            default:
              return;
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

        if(moveableActiveElement?.type === 'CIRCLE') {

          switch (resizingDirection) {
            case 'move':
              setStartX(clientX);
              setStartY(clientY);
              break;
            case 'se':
              newWidth = clientX - startX; 
              newHeight = clientY - startY;
  
              if(newWidth < 0) {
                setResizingDirection("sw")
              }
              if(newHeight < 0) setResizingDirection("ne");
              break;
            case 'ne':
              newWidth = clientX - startX;
              newHeight = height - (clientY - startY);
              setStartY(clientY);
              if(newWidth < 0) {
                setResizingDirection("nw")
              }
              if(newHeight < 0) setResizingDirection("se");
              break;
            case 'sw':
              newWidth = width - (clientX - startX)
              newHeight = clientY - startY
              setStartX(clientX)
              if(newWidth < 0) {
                setResizingDirection("se")
              }
              if(newHeight < 0) setResizingDirection("nw");
              break;
            case 'nw':
              newWidth = width - (clientX - startX);
              newHeight = height - (clientY - startY);
              setStartX(clientX);
              setStartY(clientY);
              if(newWidth < 0) {
                setResizingDirection("ne")
              }
              if(newHeight < 0) setResizingDirection("sw");
              break;
            default:
              return;
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
            case 'e':
              newWidth = clientX - startX; 
              newHeight = clientY - startY;
              break;
            case 'w':
              newWidth = width - (clientX - startX);
              newHeight = height -(clientY - startY);
              setStartX(clientX);
              setStartY(clientY);
              break;
            default:
              return;
          }
            
          setWidth(newWidth);
          setHeight(newHeight);
  
          const copyElement = [...elements];
  
          copyElement[moveableActiveElement.id] = createElement({
            id: moveableActiveElement.id, 
            startX: startX, 
            startY: startY, 
            currentX: startX + width, 
            currentY: startY + height, 
            type: moveableActiveElement.type
          });

          setElements(copyElement);
        }

        if(moveableActiveElement.type === 'TEXT') {

          switch (resizingDirection) {
            case 'move':
              setStartX(clientX);
              setStartY(clientY);
              break;
            default:
              return;
          }
  
          const copyElement = [...elements];
  
          copyElement[moveableActiveElement.id] = {
            id: moveableActiveElement.id, 
            startX: startX, 
            startY: startY + 15, 
            text: moveableActiveElement.text, 
            width: moveableActiveElement.text.length*12, 
            height: 15, 
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

  if (moveableActiveElement?.type == 'ARROW') {
    
    return (
      <div
      ref={resizeComp}
      >

        <div
          style={{
            top: `${startY - 5}px` ,
            left: `${startX - 2}px`,
          }}
          onMouseDown={(e) => {
            e.stopPropagation()
            handleMouseDown({e:e, direction: 'w'})}}
          className='absolute p-[4px] top-[5px] left-[15px] bg-lime-500 border border-lime-500 rounded-xl cursor-nw-resize '
        />
        <div
          style={{
            top: `${startY + height - 5}px` ,
            left: `${startX + width - 2}px`,
          }}
          onMouseDown={(e) => {
            e.stopPropagation()
            handleMouseDown({e:e, direction: 'e'})}}
          className='absolute p-[4px] top-[5px] left-[15px] bg-lime-500 border border-lime-500 rounded-xl cursor-nw-resize '
        />
      </div>
    )
  }


  return (
    <div
    ref={resizeComp} 
    style={{
      top: `${ moveableActiveElement?.type == 'CIRCLE' ? startY - height - 10 :startY - 10}px` ,
      left: `${moveableActiveElement?.type == 'CIRCLE' ? startX - width - 10 :startX - 10}px`,
      width: `${moveableActiveElement?.type == 'CIRCLE' ? 2*(Math.abs(width)) + 20 : Math.abs(width) + 20}px`,
      height: `${moveableActiveElement?.type == 'CIRCLE' ? 2*(Math.abs(height)) + 20 : Math.abs(height) + 20}px`,
    }}
    className={`${moveableActiveElement ? 'absolute' : 'hidden'} bg-transparent border z-40 border-lime-500 cursor-move`}
    onMouseDown={(e) => handleMouseDown({e:e, direction: 'move'})}
    >
        <div
        onMouseDown={(e) => {
          e.stopPropagation()
          handleMouseDown({e:e, direction: 'nw'})}}
        className='absolute p-[3px] -top-[5px] -left-[5px] bg-black border border-lime-500 rounded-sm cursor-nw-resize '/>
        <div
        onMouseDown={(e) => {
          e.stopPropagation()
          handleMouseDown({e:e, direction: 'ne'})}} className='absolute p-[3px] -top-[5px] -right-[5px] bg-black border border-lime-500 cursor-ne-resize '/>
        <div
        onMouseDown={(e) => {
          e.stopPropagation()
          handleMouseDown({e:e, direction: 'sw'})}} className='absolute p-[3px] -bottom-[5px] -left-[5px] bg-black border border-lime-500 cursor-sw-resize'/>
        <div
        onMouseDown={(e) => {
          e.stopPropagation()
          handleMouseDown({e:e, direction: 'se'})}} className='absolute p-[3px] -bottom-[5px] -right-[5px] bg-black border border-lime-500 cursor-se-resize '/>
    </div>
  )
  

}

export default BoundingBox