'use client'
import React, { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

function Provider({children}: {children: ReactNode}) {
  return (
    <RecoilRoot>{children}</RecoilRoot>
  )
}

export default Provider