export interface Interrupt{
    IRQNum: number
    prio: number
    devName: string
    inputBuffer?: string[]
    outputBuffer?:string[]

    
}