import rough from 'roughjs';

export function createElement({id, startX, startY, currentX, currentY }: any){
    const generator = rough.generator()
    const roughElement = generator.rectangle(startX, startY, currentX-startX,currentY-startY, {stroke: 'white'} )


    return {
      id,
      startX,
      startY,
      roughElement
    }
}