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
            
            let startY, endY;
            if(element.startY < element.endY) startY = element.startY;
            else startY = element.endY;
            if(element.endY > element.startY) endY = element.endY;
            else endY = element.startY;

            if(element.startX <= x && x <= element.endX && startY <= y && y <= endY ) {
                setMoveableActiveElement(element);
                foundElement = true;
            }
        }

        if(element.type === 'CIRCLE') {
            
            const rx = Math.abs(element.radiusX);
            const ry = Math.abs(element.radiusY);
            const dx = x - element.startX;
            const dy = y - element.startY
            
            const circleArea = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry)

            if(circleArea <= 1) {

                element = {
                    id: element.id,
                    startX: element.startX,
                    startY: element.startY,
                    width: element.radiusX,
                    height: element.radiusY,
                    roughElement: element.roughElement,
                    type: element.type,
                }
                console.log(element);
                
                setMoveableActiveElement(element);
                foundElement = true;
                
            }
        }

        if(element.type === 'TEXT') {
            console.log(element);
            const width = element.startX + element.text.length * 12
            
            if(element.startX <= x && x <= width && y <= element.startY && y >= element.startY - 20 ) {
                element = {
                    id: element.id, 
                    startX: element.startX, 
                    startY: element.startY - 15, 
                    text: element.text, 
                    width: element.width, 
                    height: element.height, 
                    type: element.type}
                setMoveableActiveElement(element);
                foundElement = true;
            }
        }

    })

    if(!foundElement) setMoveableActiveElement(null)

}