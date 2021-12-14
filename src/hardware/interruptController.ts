import {Hardware} from "./Hardware";
import { Interrupt } from "./imp/Interrupt";

export class IC extends Hardware{
    private interruptArr : Interrupt[];
    private queue = []
    public isIR: boolean
    public addIR(IRItem){
        this.interruptArr.push(IRItem);
    }
    public acceptIR(IRpush){
        this.isIR = true;
        this.queue.push(IRpush)
        this.queue.sort((firstItem, secondItem) => firstItem.prio - secondItem.prio)
    }
    public runFunct(){
        this.queue.shift().ICRun()
        if(this.queue.length == 0){
            this.isIR = false;
        }
    }
    constructor(){
        super(0,"IC")
    }
}