import { useRecoilState } from "recoil";
import { elementsAtom, moveableActiveElementAtom } from "./atom";

export default function  setActiveElement({elements , setElements,moveableActiveElement, setMoveableActiveElement, x, y}: {elements:any , setElements: any,moveableActiveElement: any , setMoveableActiveElement: any, x:number, y:number}) {
    
    let foundElement;

    elements.forEach((element: any) => {
        
        if(element.type === 'SQUARE') {
            
            
            if(element.startX <= x && x <= element.startX + element.width && element.startY <= y && y <= element.startY + element.height ) {
                setMoveableActiveElement(element);
                foundElement = true;
            }
        }

        if(element.type === 'ARROW') {
            if(element.startX <= x <= element.endX && element.startY <= y <= element.endY ) {
                console.log('found');
                foundElement = true;
            }
        }

        if(element.type === 'CIRCLE') {
            console.log(element.roughElement);
            
            const rx = Math.abs(element.radiusX);
            const ry = Math.abs(element.radiusY);
            const dx = x - element.startX;
            const dy = y - element.startY
            
            const circleArea = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry)

            if(circleArea <= 0.28) {

                setMoveableActiveElement(element);
                foundElement = true;
                
            }
        }

        if(element.type === 'TEXT') {
            console.log(element);
            const width = element.startX + element.text.length * 12
            
            if(element.startX <= x && x <= width && y <= element.startY && y >= element.startY - 20 ) {
                setMoveableActiveElement(element);
                foundElement = true;
            }
        }

    })

    if(!foundElement) setMoveableActiveElement(null)

}