import {System} from "../System";
import {Hardware} from "./Hardware";
import {Cpu} from "./Cpu"
import {ClockListener} from "./imp/Clocklistener"
import { Clock } from "./Clock";
import { MMU } from "./MMU"
export class Memory extends Hardware implements ClockListener{
    private memArr : number[];
    public memSize : number = 0x10000
    private MAR : number = 0x0
    private MDR : number = 0x0
    //function that creates the array of 0x00 values in the memory array to be overwritten later
    public initMem(){
        this.memArr = new Array(0x10000);
        for (let i = 0; i < this.memSize; i++){
            this.memArr[i] = 0x00;
        }
    }
    //function that logs the first 16 values in the memory, and if the attempted call is not an actual number in that range, then it errors out
    public dispCont(start,end){
        for (let i = start; i <= end; i++) {
            if((i<=0xFFFF) && (i>=0x00)){
                console.log(this.hexLog(this.memArr[i],4));
            }else{
                console.log("RAM Address: "+i+" is experiencing a conversion error. Data undefined")
            }
        }
    }
    public reset(){
        this.MAR = 0x0
        this.MDR = 0x0
        for (let i = 0; i < this.memSize; i++){
            this.memArr[i] = 0x0;
        }
    }
    public pulse(){

    };

    public getMAR(){
        return this.MAR
    }
    public getMDR(){
        return this.MDR
    }
    public setMDR(datMDR){
        this.MDR = datMDR
    }
    public setMAR(datMAR){
        this.MAR = datMAR
    }
    public read(){
        this.setMDR(this.memArr[this.getMAR()])
    }
    public write(){
        this.memArr[this.getMAR()] = this.getMDR()
    }
    constructor() {
        super(0,"RAM",false, 65536);

        
}
}
