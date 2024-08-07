
import { BoxSelect, Menu, Minus, Square } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeToolAtom, strokeAtom, strokeWidthAtom, strokeStyleAtom, elementsAtom, moveableActiveElementAtom } from '../utils/atom';
import { createElement } from '../utils/createElement';

function UtilBar() {
    const [elements, setElements] = useRecoilState(elementsAtom);
  const [moveableActiveElement, setMoveableActiveElement] = useRecoilState<any>(moveableActiveElementAtom);
    const [Stroke, setStroke] = useRecoilState(strokeAtom);
    const [StrokeWidth, setStrokeWidth] = useRecoilState(strokeWidthAtom);
    const [StrokeStyle, setStrokeStyle] = useRecoilState(strokeStyleAtom);
    const tool = useRecoilValue(activeToolAtom);
    const [utilBarVisible, setUtilBarVisible] = useState(false);

    useEffect(() => {
        const copyElement = [...elements];
        
        if(!moveableActiveElement) return
        // @ts-ignore
        copyElement[moveableActiveElement.id] = createElement({
            id: moveableActiveElement.id, 
            startX: moveableActiveElement.startX, 
            startY: moveableActiveElement.startY, 
            currentX: moveableActiveElement.currentX, 
            currentY: moveableActiveElement.currentY, 
            type: moveableActiveElement.type, 
            empty: moveableActiveElement.empty, 
            stroke: Stroke || moveableActiveElement.stroke, 
            strokeWidth: StrokeWidth || moveableActiveElement.strokeWidth, 
            strokeStyle: StrokeStyle || moveableActiveElement.strokeStyle,
        })
        
        setElements(copyElement);

    }, [Stroke, StrokeWidth, StrokeStyle, moveableActiveElement])
    

  return (
    <div
    className='text-white'
    >
        <Menu size={40} className='fixed top-4 left-3 p-2 bg-gray-900 rounded-lg text-white'
        onClick={() => setUtilBarVisible((prev) => !prev)}
        />
        <div className={`fixed flex flex-col space-y-3 top-20 ${utilBarVisible || moveableActiveElement ? " left-3" : " -left-96"} p-6 transition-all w-[11vw] rounded-xl bg-gray-900`}>
            <div>   
                <p className='text-sm mb-1'>Stroke</p>
                <div className='flex space-x-2'>
                    <div className={`p-3 ${Stroke === '#f96d00' ? 'border border-white scale-125' : ""} rounded-md transition-all duration-300 bg-[#f96d00]`}
                    onClick={(e) => {
                        setStroke('#f96d00');
                    }}
                    />
                    <div className={`p-3 ${Stroke === '#f70776' ? 'border border-white scale-125' : ""} rounded-md transition-all duration-300 bg-[#f70776]`}
                    onClick={(e) => {
                        setStroke('#f70776');
                    }}
                    />
                    <div className={`p-3 ${Stroke === '#0092ca' ? 'border border-white scale-125' : ""} rounded-md transition-all duration-300 bg-[#0092ca]`}
                    onClick={(e) => {
                        setStroke('#0092ca');
                    }}
                    />
                    <div className={`p-3 ${Stroke === '#f4e022' ? 'border border-white scale-125' : ""} rounded-md transition-all duration-300 bg-[#f4e022]`}
                    onClick={(e) => {
                        setStroke('#f4e022');
                    }}
                    />
                    <div className={`p-3 ${Stroke === '#fffdfb' ? 'border border-black scale-125' : ""} rounded-md transition-all duration-300 bg-[#fffdfb]`}
                    onClick={(e) => {
                        setStroke('#fffdfb');
                    }}
                    />
                </div>
            </div>
            <div>
                <p className='text-sm mb-1'>Stroke Width</p>
                <div className='flex space-x-2'>
                    <Minus size={30} strokeWidth={1} className={`${StrokeWidth === 1 ? 'border border-white scale-125' : ""} rounded-md transition-all duration-300 bg-gray-800`}
                    onClick={(e) => {
                        setStrokeWidth(1);
                    }}
                    />
                    <Minus size={30} strokeWidth={2} className={`${StrokeWidth === 2 ? 'border border-white scale-125' : ""} rounded-md transition-all duration-300 bg-gray-800`}
                    onClick={(e) => {
                        setStrokeWidth(2);
                    }}
                    />
                    <Minus size={30} strokeWidth={3} className={`${StrokeWidth === 3 ? 'border border-white scale-125' : ""} rounded-md transition-all duration-300 bg-gray-800`}
                    onClick={(e) => {
                        setStrokeWidth(3);
                    }}
                    />
                </div>
                
            </div>
            {tool !== 'PEN' ? 
            <div>
                <p className='text-sm mb-1'>Stroke Style</p>
                <div className='flex space-x-2'>
                    <Square size={30} strokeWidth={2} className={`${StrokeStyle === 0 ? 'border border-white scale-125' : ""} rounded-md transition-all duration-300 bg-gray-800`}
                    onClick={(e) => {
                        setStrokeStyle(0);
                    }}
                    />
                    <BoxSelect size={30} strokeWidth={2}  className={`${StrokeStyle === 15 ? 'border border-white scale-125' : ""} rounded-md transition-all duration-300 bg-gray-800`}
                    onClick={(e) => {
                        setStrokeStyle(15);
                    }}
                    />
                </div>

            </div>
             : ''}
            
        </div>
    </div>
  )
}

export default UtilBar;