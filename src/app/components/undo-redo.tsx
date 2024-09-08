import { Redo, Undo } from 'lucide-react'
import React from 'react'
import { useRecoilState } from 'recoil';
import { elementsAtom, undoListAtom } from '../utils/atom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function Undo_Redo() {
    const [elements, setElements] = useRecoilState(elementsAtom);
    const [undoList, setUndoList] = useRecoilState(undoListAtom);
    let copyElement = [...elements];
    let copyUndoList = [...undoList];

    useGSAP(() => {
        gsap.to("#UndoRedo", {
            right: 20,
            delay: 1,
            opacity: 100,
            duration: 1,
        })
    })

  return (
    <div id='UndoRedo' className='flex fixed right-0 opacity-0 top-5 space-x-2 z-50 bg-gray-900 p-1 rounded-lg'>
        <Undo size={40} className={`hover:bg-gray-950 p-1 rounded-lg ${elements.length == 0 ? "text-gray-600" : "text-white"} `} 
        onClick={() => {
            const popped = copyElement.pop();
            if(!popped) return;
            setUndoList([popped, ...undoList])
            setElements(copyElement);
            console.log(popped);
            
        }}
        />
        <Redo size={40} className={`hover:bg-gray-950 p-1 rounded-lg ${undoList.length == 0 ? "text-gray-600" : "text-white"} `}
        onClick={() => {
            const element = copyUndoList.shift();
            if(!element) return;
            setElements([...elements, element]);
            setUndoList([...copyUndoList]);
        }}
        />
    </div>
  )
}

export default Undo_Redo