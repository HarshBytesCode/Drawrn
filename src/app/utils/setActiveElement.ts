
export default function  setActiveElement({elements ,moveableActiveElement, setMoveableActiveElement, x, y}: {elements:any , moveableActiveElement: any , setMoveableActiveElement: React.Dispatch<React.SetStateAction<any>>, x:number, y:number}) {
    
    let foundElement = false;

    elements.forEach((element: any) => {
        if(!element) return
        if(element.type === 'SQUARE') {
            
            
            if(element.startX <= x && 
            x <= element.startX + element.width && 
            element.startY <= y && 
            y <= element.startY + element.height ) {
        
                setMoveableActiveElement(element);
                foundElement = true;
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
                setMoveableActiveElement(element);
                foundElement = true;
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
                setMoveableActiveElement(element);
                foundElement = true;
                return;
                
            }
        }

        if(element.type === 'TEXT') {
            const width = element.startX + element.text.length * 12
            
            if(element.startX <= x && x <= width && y <= element.startY && y >= element.startY - 20 ) {
                setMoveableActiveElement(element);
                foundElement = true;
                return;
                
                
            }
        }

    })
    
    if(!foundElement) setMoveableActiveElement(null)

}