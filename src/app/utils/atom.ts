import { atom } from "recoil";


export const activeToolAtom = atom({
    key: 'activeTool',
    default: 'PEN'
})

export const elementsAtom = atom({
    key: 'elements',
    default: []
})