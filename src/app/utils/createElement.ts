import rough from 'roughjs';
let temp: {}[] = [];
let prevX:number | null, prevY: number | null;

export function createElement({id, startX, startY, currentX, currentY, type, empty, stroke, strokeWidth, strokeStyle }: any){
    const generator = rough.generator()
    
    if(type == 'PEN') {
      if(empty) {
        temp = [];
        prevX = null;
        prevY = null;
        return
      }
      if(prevX && prevY) {

        const roughElement = generator.line(prevX, prevY, startX, startY, {stroke, strokeWidth: 2 + (2*strokeWidth), roughness: 0,})
        temp = [...temp, roughElement]

      }
      prevX = startX;
      prevY = startY
      return {
        id,
        roughElementArray: temp,
        type
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
        radiusX: currentX - startX,
        radiusY: currentY - startY,
        roughElement,
        type,
        stroke,
        strokeWidth,
        strokeStyle
      }
    }
}