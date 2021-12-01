import {System} from "../System";
import {Hardware} from "./Hardware";
import {ClockListener} from "./imp/Clocklistener";
import { Clock } from "./Clock";
import { MMU } from "./MMU"
export class Cpu extends Hardware implements ClockListener{
    //Function that counts the amount of pulses its recieved and posts the message with that number to the console
    public memUnit: MMU
    public xReg: number
    public yReg: number
    public accumulator: number
    public zFlag: number = 1
    public progCount: number = 0
    public currCount: number = 0
    public holder: number
    public tempstore

    //A9
    public loadAccCon(){
        this.accumulator = this.holder        
    }
    //AD
    public loadAccMem(holding){
        this.memUnit.changeMAR(holding,true,false)
        this.memUnit.CPURead()
        this.accumulator = this.memUnit.reader
    }
    //8D
    public stoAccMem(holding){
        this.tempstore = this.accumulator.toString(16).toUpperCase()
        let padding : string = "";
        for (let i = 2; i > this.tempstore.length; i--){
            padding += "0";
        }
        this.tempstore = "0x"+padding+this.tempstore
        this.memUnit.writeImmidiate(holding,this.accumulator)
    }
    //8A
    public loadAccX(){
        this.accumulator = this.xReg
    }
    //98
    public loadAccY(){
        this.accumulator = this.yReg
    }
    //6D ------------------------------------------------------------------------------------------------

    //A2
    public loadXCon(){
        this.xReg = this.holder        
    }
    //AE
    public loadXMem(holding){
        this.memUnit.changeMAR(holding,true,false)
        this.memUnit.CPURead()
        this.xReg = this.memUnit.reader
    }
    //AA
    public loadXAcc(){
        this.xReg = this.accumulator   
    }
    //A0
    public loadYCon(){
        this.yReg = this.holder        
    }
    //AC
    public loadYMem(holding){
        this.memUnit.changeMAR(holding,true,false)
        this.memUnit.CPURead()
        this.yReg = this.memUnit.reader
    }
    //A8
    public loadYAcc(){
        this.yReg = this.accumulator      
    }
    //EA
    public NOP(){
        //Coffee Break Stuff Happens Here
    }
    //00
    public Break(holder){
        //END PROGRAM -----------------------------------------------------------------------------------------
    }
    //EC
    public compare(holding){
        this.memUnit.changeMAR(holding,true,false)
        this.memUnit.CPURead()
        this.xReg = this.memUnit.reader
    }
    //D0
    public Branch(holding){
        if(this.zFlag = 0){
        this.progCount += holding //Need to set up negative numbers---------------------------------------------
        }
    }
    //EE
    public increment(holding){
        this.memUnit.changeMAR(holding,true,false)
        this.memUnit.CPURead()
        this.holder = this.memUnit.reader + 1
        this.memUnit.writeImmidiate(holding,this.holder)
    }
    //FF
    public systemCall(holding){
        if(this.xReg == 1){
            console.log(this.yReg)
        }else if(this.xReg == 2){
            this.tempstore = this.yReg.toString(16).toUpperCase()
            let padding : string = "";
            for (let i = 4; i > this.tempstore.length; i--){
                padding += "0";
            }
            this.tempstore = "0x"+padding+this.tempstore
            this.memUnit.changeMAR(this.tempstore,true,false)
            this.memUnit.CPURead()
            console.log(this.memUnit.reader)
        }else if(this.xReg == 3){
            this.memUnit.changeMAR(holding,true,false)
            this.memUnit.CPURead()
            console.log(this.memUnit.reader)
        }
    }
    public pulse(){
        this.ClockCount++;
        //console.log("received clock pulse - CPU Clock Count: " + this.ClockCount);
    }


    private ClockCount : number = 0;
    constructor(count,memHolder) {
        super(0,"CPU",true);
        this.memUnit = memHolder;
    }
}
