import rough from 'roughjs';
let temp: {}[] = [];
let prevX:number | null, prevY: number | null;

export function createElement({id, startX, startY, currentX, currentY, type, empty }: any){
    const generator = rough.generator()
    
    if(type == 'PEN') {
      if(empty) {
        temp = [];
        prevX = null;
        prevY = null;
        return
      }
      if(prevX && prevY) {

        const roughElement = generator.line(prevX, prevY, startX, startY, {stroke: 'white', strokeWidth: 5, roughness: 0,})
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

      const roughElement = generator.line(startX, startY, currentX, currentY, {stroke: 'white', strokeWidth: 2, roughness: 2, bowing: 1.25})
      return {
        id,
        startX,
        startY,
        endX: currentX,
        endY: currentY,
        width: currentX - startX,
        height: currentY - startY ,
        roughElement,
        type
      }
    }

    if(type == 'SQUARE') {
      
      const roughElement = generator.rectangle(startX, startY, currentX,currentY, {stroke: 'white', roughness: 1, bowing: 2} )
      return {
        id,
        startX,
        startY,
        width: currentX,
        height: currentY,
        roughElement,
        type
      }
    }
    if(type == 'CIRCLE') {
      const roughElement = generator.ellipse(startX, startY, 2*(currentX-startX), 2*(currentY-startY), {stroke: 'white',strokeWidth: 1, roughness: 0} )
      return {
        id,
        startX,
        startY,
        radiusX: currentX - startX,
        radiusY: currentY - startY,
        roughElement,
        type
      }
    }
}