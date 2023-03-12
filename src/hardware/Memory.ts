import {Hardware} from "../hardware/Hardware";
import { ClockListener } from "./imp/ClockListener";

export class Memory extends Hardware implements ClockListener{

    public hexArray:number[];
    private MAR: number = 0x0000;
    private MDR: number = 0x00;
    // Size of addressable memory.
    private memSize: number = 0x10000;
    constructor(){
        super(0, "RAM");
        this.id = 0;
        this.name = "RAM"
        this.log("created - Addressable Space: " + this.memSize);
    }
    // Initializes the array, and then fills with 0x00.
    public initMem() {
        this.hexArray = new Array (this.memSize);
        for (let i = 0; i < this.memSize; i++){
            this.hexArray[i] = 0x00;
        }
    }
    // Displays content of memory (0x00 to 0x14)
    public displayMemory(){
        for (let i = 0x00; i <= 0x14; i++){
            let memAdrr = this.hexLog(i, 4);
            let dataVal = this.hexArray[i];
            let memNum = this.hexLog(dataVal, 2);
            if (dataVal == undefined || dataVal == null){
                this.log("Addr " + memAdrr + ":  |  " + memNum + " ERR: number undefined");
            }else{
                this.log("Addr " + memAdrr + ":  |  " + memNum);
            }
        }
    }
    // Getter for the Memory
    public getMemoryArr(){
        return this.hexArray;
    }
    // Setter for Memory array
    public setMemoryArr(hexArray){
        this.hexArray = hexArray;
    }
     //Getter for MAR
     public getMAR() {
        return this.MAR;
    }
    //Setter for MAR
    public setMAR(mar) {
        this.MAR = mar;
    }
    //Getter for MDR
    public getMDR() {
        return this.MDR;
    }
    //Setter for MDR
    public setMDR(MDRHolder) {
        this.MDR = MDRHolder;
    }
    //Pulse Method
    public pulse(){
        this.log("Received clock pulse");
    }
    //Read memory at a location
    public read() {
        this.setMDR(this.hexArray[this.getMAR()]);
        return this.MDR;
    }
    //Write the contents of the MDR to memory
    public write() {    
        let memArr: number[] = this.getMemoryArr();
        memArr[this.getMAR()] = this.getMDR();
        this.setMemoryArr(memArr);
    }
    // Resets all values in the Memory and MAR+MDR with 0x00
    public reset(){
        let memArr: number[] = this.getMemoryArr();
        for (let i = 0x00; i < memArr.length; i++){
            memArr[i] = 0x00;
        }
        this.setMemoryArr(memArr);
        this.setMDR(0x00);
        this.setMAR(0x0000);
    }
}