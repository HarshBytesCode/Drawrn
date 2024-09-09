import rough from 'roughjs';
let temp: {}[] = [];
let minX:number = Infinity, minY: number = Infinity, maxX:number = -Infinity, maxY: number = -Infinity

export function createElement({id, startX, startY, currentX, currentY, type, empty, stroke, strokeWidth, strokeStyle }: any){
    const generator = rough.generator()
    
    if(type == 'PEN') {
      if(empty) {
        temp = [];
        minX = Infinity 
        minY = Infinity
        maxX = -Infinity
        maxY = -Infinity
        return
      }
      if(!currentX && !currentY) {
        temp = [...temp, {startX, startY}]
        return
      }

      temp = [...temp, {currentX, currentY}]
      minX = Math.min(minX, currentX);
      minY = Math.min(minY, currentY);
      maxX = Math.max(maxX, currentX);
      maxY = Math.max(maxY, currentY);
      
      return {
        id,
        roughElement: temp,
        type,
        stroke,
        startX: minX,
        startY: minY,
        width: maxX - minX,
        height: maxY - minY,
        strokeWidth: strokeWidth*2,
      }
      
    }

    if(type == 'ARROW') {

      const roughElement = generator.line(startX, startY, currentX, currentY, {stroke, strokeWidth: 2* strokeWidth, strokeLineDash: [strokeStyle], roughness: 2, bowing: 1.25})
      return {
        id,
        startX,
        startY,
        endX: currentX,
        endY: currentY,
        currentX,
        currentY,
        width: currentX - startX,
        height: currentY - startY ,
        roughElement,
        type,
        stroke,
        strokeWidth,
        strokeStyle
      }
    }

    if(type == 'SQUARE') {
      
      const roughElement = generator.rectangle(startX, startY, currentX,currentY, {stroke, strokeWidth: 2*strokeWidth, roughness: 1, bowing: 2, strokeLineDash: [strokeStyle]} )
      return {
        id,
        startX,
        startY,
        currentX,
        currentY,
        width: currentX,
        height: currentY,
        roughElement,
        type,
        stroke,
        strokeWidth,
        strokeStyle
      }
    }
    if(type == 'CIRCLE') {
      const roughElement = generator.ellipse(startX, startY, 2*(currentX-startX), 2*(currentY-startY), {stroke, strokeWidth: 2*strokeWidth, roughness: 0, strokeLineDash: [strokeStyle]} )
      return {
        id,
        startX,
        startY,
        currentX,
        currentY,
        width: currentX - startX,
        height: currentY - startY,
        roughElement,
        type,
        stroke,
        strokeWidth,
        strokeStyle
      }
    }
}