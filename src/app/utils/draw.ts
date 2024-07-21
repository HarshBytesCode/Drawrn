import { RefObject } from "react";
import usePosition from "../hooks/usePosition";
import useClick from "../hooks/useClick";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeTool } from "./atom";


export default function Draw(canvasRef: RefObject<HTMLCanvasElement>) {
    const [tool, setTool] = useRecoilState(activeTool);
    const ctx = canvasRef.current?.getContext("2d");
    const {position, velocity} = usePosition()
    const mouse = useClick()
    let x,y;
    const scrollY = window.scrollY
    const scrollX = window.scrollX
    
    if(mouse && position){
      [x, y] = [position.x, position.y]

    }

    if(tool === 'PEN'){
      if(!mouse){
        ctx?.beginPath()  
      }
      if(position && ctx && mouse) {
        ctx.lineCap= 'round'
        ctx.lineWidth = velocity*2;
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineTo(position.x + scrollX, position.y + scrollY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(position.x + scrollX, position.y +scrollY);
        
      }
    }
    if(tool === 'MOVE') {
      
    }
    let z = 0;
    if(tool === 'SQUARE') {
      // let x: number,y:number;
      // let z = 0;
      // if(position && mouse && z === 0){
      //   x = position.x
      //   y = position.y
      //   z++
      // }
      if(ctx && mouse && position ) {
        ctx.strokeStyle = '#FFFFFF'
        ctx.fillStyle = 'red'
        ctx?.fillRect(x,y, position.x -x,position.y-y)
        ctx?.stroke

      }
    }

    if(tool === 'CLEAR') {
      ctx?.clearRect(0,0, canvasRef.current?.width, canvasRef.current?.height)
      setTool('PEN')
    }
}