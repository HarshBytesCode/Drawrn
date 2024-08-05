import { atom } from "recoil";


export const activeToolAtom = atom({
    key: 'activeTool',
    default: 'PEN'
})

export const elementsAtom = atom({
    key: 'elements',
    default: []
})

export const isWritingAtom = atom({
    key: 'isWriting',
    default: false
})

export const moveableActiveElementAtom = atom({
    key: 'moveableActiveElementAtom',
    default: null
})

export const strokeAtom = atom({
    key: 'stroke',
    default: '#fffdfb',
})

export const strokeWidthAtom = atom({
    key: 'strokeWidth',
    default: 1,
})

export const strokeStyleAtom = atom({
    key: 'strokeStyle',
    default: 0,
})