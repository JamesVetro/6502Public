import {System} from "../System";
import {Hardware} from "./Hardware";
import {Cpu} from "./Cpu"
export class Memory extends Hardware {
    private memArr : 0x00[];
    public memSize : 0x10000
    public initMem(){
        this.memArr = new Array();
        for (let i = 0; i < this.memSize; i++){
            this.memArr.push(0x00);}
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
