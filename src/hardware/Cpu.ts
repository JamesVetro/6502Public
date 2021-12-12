import {System} from "../System";
import {Hardware} from "./Hardware";
import {ClockListener} from "./imp/Clocklistener";
import { Clock } from "./Clock";
import { MMU } from "./MMU"
import { Ascii } from "./Ascii"
export class Cpu extends Hardware implements ClockListener{
    //Function that counts the amount of pulses its recieved and posts the message with that number to the console
    public memUnit: MMU
    public table: Ascii = new Ascii();
    public xReg: number
    public yReg: number
    public accumulator: number
    public zFlag: number = 1
    public progCount: number = 0
    public currCount: number = 0
    public instructionReg: number = 0
    public holder: number
    public holder2: number
    public tempStore
    public twoFlag
    public stepCount: number = 1
    
    public fetch(){
        this.tempStore = this.progCount.toString(16).toUpperCase()
        let padding : string = "";
        for (let i = 4; i > this.tempStore.length; i--){
            padding += "0";
        }
        this.tempStore = "0x"+padding+this.tempStore
        this.memUnit.changeMAR(this.tempStore,true,false)
        this.memUnit.CPURead()
        this.instructionReg = this.memUnit.reader
        this.stepCount++
    }
    public decode(){
        
        switch(this.instructionReg){
            case 0xA9:
                this.decoder()
                this.stepCount+=2
            case 0xAD:
                this.decoder()
                this.stepCount++
            case 0x8D:
                this.decoder()
                this.stepCount++
            case 0x8A:
                this.stepCount+=2
            case 0x98:
                this.stepCount+=2
            case 0x6D:
                this.decoder()
                this.stepCount++
            case 0xA2:
                this.decoder()
                this.stepCount+=2
            case 0xAE:
                this.decoder()
                this.stepCount++
            case 0xAA:
                this.stepCount+=2
            case 0xA0:
                this.decoder()
                this.stepCount+=2
            case 0xAC:
                this.decoder()
                this.stepCount++
            case 0xA8:
                this.stepCount+=2
            case 0xEA:
                this.stepCount+=2
            case 0x00:
                this.stepCount+=2
            case 0xEC:
                this.decoder()
                this.stepCount++
            case 0xD0:
                this.decoder()
                this.stepCount+=2
            case 0xEE:
                this.decoder()
                this.stepCount++
            case 0xFF:
                this.decoder()
                this.stepCount++
        }
    }
    public decode2(){
        this.decoder2()
        this.stepCount++
    }
    public execute(){
        switch(this.instructionReg){
            case 0xA9:
                this.loadAccCon()
            case 0xAD:
                this.loadAccMem()
            case 0x8D:
                this.stoAccMem()
            case 0x8A:
                this.loadAccX()
            case 0x98:
                this.loadAccY()
            case 0x6D:
                //----------------------------------------------------------------------------
            case 0xA2:
                this.loadXCon()
            case 0xAE:
                this.loadXMem()
            case 0xAA:
                this.loadXAcc()
            case 0xA0:
                this.loadYCon()
            case 0xAC:
                this.loadYMem()
            case 0xA8:
                this.loadYAcc()
            case 0xEA:
                this.NOP()
            case 0x00:
                this.Break() //-------------------------------------------------------
            case 0xEC:
                this.compare
            case 0xD0:
                this.Branch(1) //-------------------------------------------------
            case 0xEE:
                this.increment()
            case 0xFF:
                this.systemCall()
        }
    }
    public execute2(){

    }
    public writeBack(){

    }
    public interrupt(){

    }
    //decode 1
    public decoder(){
        let padding : string = "";
        this.tempStore = this.progCount+1
        this.tempStore = this.tempStore.toString(16).toUpperCase()
        for (let i = 4; i > this.tempStore.length; i--){
        padding += "0";
        }
        this.tempStore = "0x"+padding+this.tempStore
        this.memUnit.changeMAR(this.tempStore,true,false)
        this.memUnit.CPURead()
        this.holder = this.memUnit.reader
    }
    //decode 2
    public decoder2(){
        let padding : string = "";
        this.tempStore = this.progCount+2
        this.tempStore = this.tempStore.toString(16).toUpperCase()
        for (let i = 4; i > this.tempStore.length; i--){
        padding += "0";
        }
        this.tempStore = "0x"+padding+this.tempStore
        this.memUnit.changeMAR(this.tempStore,true,false)
        this.memUnit.CPURead()
        this.holder2 = this.memUnit.reader
    }
    //A9
    public loadAccCon(){
        this.accumulator = this.holder        
    }
    //AD
    public loadAccMem(){
        this.memUnit.changeMAR(this.holder,true,false)
        this.memUnit.CPURead()
        this.accumulator = this.memUnit.reader
    }
    //8D
    public stoAccMem(){
        this.tempStore = this.accumulator.toString(16).toUpperCase()
        let padding : string = "";
        for (let i = 2; i > this.tempStore.length; i--){
            padding += "0";
        }
        this.tempStore = "0x"+padding+this.tempStore
        this.memUnit.writeImmidiate(this.holder,this.accumulator)
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
    public loadXMem(){
        this.memUnit.changeMAR(this.holder,true,false)
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
    public loadYMem(){
        this.memUnit.changeMAR(this.holder,true,false)
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
    public Break(){
        process.exit;
        //-------------------------------------------------------------------
    }
    //EC
    public compare(){
        this.memUnit.changeMAR(this.holder,true,false)
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
    public increment(){
        this.memUnit.changeMAR(this.holder,true,false)
        this.memUnit.CPURead()
        this.tempStore = this.memUnit.reader + 1
        this.memUnit.writeImmidiate(this.holder,this.tempStore)
    }
    //FF
    public systemCall(){
        if(this.xReg == 1){
            console.log(this.yReg)
        }else if(this.xReg == 2){
            this.tempStore = this.yReg.toString(16).toUpperCase()
            let padding : string = "";
            for (let i = 4; i > this.tempStore.length; i--){
                padding += "0";
            }
            this.tempStore = "0x"+padding+this.tempStore
            this.memUnit.changeMAR(this.tempStore,true,false)
            this.memUnit.CPURead()
            console.log(this.memUnit.reader)
        }else if(this.xReg == 3){
            this.memUnit.changeMAR(this.holder,true,false)
            this.memUnit.CPURead()
            console.log(this.memUnit.reader)
        }
    }
    public pulse(){
        this.ClockCount++;
        
        switch(this.stepCount){
            case 1:
                this.fetch()
            case 2:
                this.decode()
            case 3:
                this.decode2()
            case 4:
                this.execute()
            case 5:
                this.execute2()
            case 6:
                this.writeBack()
            case 7:
                this.interrupt()
        }
    }


    private ClockCount : number = 0;
    constructor(count,memHolder) {
        super(0,"CPU",true);
        this.memUnit = memHolder;
    }
}
