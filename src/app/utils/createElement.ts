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
        roughElement,
        type
      }
    }

    if(type == 'SQUARE') {
      const roughElement = generator.rectangle(startX, startY, currentX-startX,currentY-startY, {stroke: 'white', roughness: 1, bowing: 2} )
      return {
        id,
        startX,
        startY,
        roughElement,
        type
      }
    }
    if(type == 'CIRCLE') {
      const roughElement = generator.ellipse(startX, startY, currentX-startX,currentY-startY, {stroke: 'white',strokeWidth: 2 , bowing: 8} )
      return {
        id,
        startX,
        startY,
        roughElement,
        type
      }
    }
}