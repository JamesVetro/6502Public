import {System} from "../System";
import {Hardware} from "./Hardware";
import {Cpu} from "./Cpu"
import {ClockListener} from "./imp/Clocklistener"
import { Clock } from "./Clock";
export class Memory extends Hardware implements ClockListener{
    private memArr : number[];
    public memSize : number = 0x10000
    public initMem(){
        this.memArr = new Array(0x10000);
        for (let i = 0; i < this.memSize; i++){
            this.memArr[i] = 0x00;
        }
    }
    public dispCont(){
        for (let i = 0x0; i < 0x15; i++) {
            if((i<=0xFFFF) && (i>=0x00)){
                console.log(this.hexLog(this.memArr[i],4));
            }else{
                console.log("RAM Address: "+i+" is experiencing a conversion error. Data undefined")
            }
        }
    }
    constructor() {
        super(0,"RAM");
        
}
}
