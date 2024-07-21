'use client'
import React, { useRef } from 'react'
import Draw from '../utils/draw'
import Bar from '../components/bar'

function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    Draw(canvasRef)
    
    
  return (
    <div>
      <canvas onContextMenu={(e) => {e.preventDefault()}} ref={canvasRef} width={1920} height={1200} className='border border-red bg-black' />
      <Bar/>
    </div>

  )
}

export default Canvas