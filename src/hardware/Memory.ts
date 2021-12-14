import {System} from "../System";
import {Hardware} from "./Hardware";
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
    //function that logs the first X values in the memory, and if the attempted call is not an actual number in that range, then it errors out
    
    public dispCont(start,end){
        console.log("[HW - MMU id: 0 - "+Date.now()+"]: Initialized Memory");
        console.log("[HW - MMU id: 0 - "+Date.now()+"]: Memory Dump: Debug");
        console.log("[HW - MMU id: 0 - "+Date.now()+"]: --------------------------------------");
        for (let i = start; i <= end; i++) {
            if((i<=0xFFFF) && (i>=0x00)){
                console.log("[HW - MMU id: 0 - "+Date.now()+"]: Addr 000"+i.toString(16).toUpperCase()+": | "+this.hexLog(this.memArr[i],2));
            }else{
                console.log("RAM Address: "+i+" is experiencing a conversion error. Data undefined")
            }
        }
        console.log("[HW - MMU id: 0 - "+Date.now()+"]: --------------------------------------");
        console.log("[HW - MMU id: 0 - "+Date.now()+"]: Memory Dump: Complete");
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
    //Getters and setters for the MAR and MDR
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
        console.log(datMAR)
        this.MAR = datMAR
        console.log(this.MAR)
    }
    //Read and write functions for the Memory
    public read(){
        
        this.setMDR(this.memArr[this.getMAR()])
        
        return this.MDR
    }
    public write(){
        this.memArr[this.getMAR()] = this.getMDR()
    }

    constructor() {
        super(0,"RAM",false, 65536);

        
}
}
