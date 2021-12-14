import {System} from "../System";
import {Hardware} from "./Hardware";
import {ClockListener} from "./imp/Clocklistener";
import { Clock } from "./Clock";
import { MMU } from "./MMU"
import { Ascii } from "./Ascii"
import { IC } from "./InterruptController"
export class Cpu extends Hardware implements ClockListener{
    //Function that counts the amount of pulses its recieved and posts the message with that number to the console
    public memUnit: MMU
    public IRUnit: IC
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
    public stringHold: string
    public tempStore
    public twoFlag
    public stepCount: number = 1
    
    public fetch(){
        
        this.memUnit.changeMAR(this.progCount,true,false)
        this.instructionReg = this.memUnit.CPURead()
        this.stepCount++
    }
    public decode(){
        
        switch(this.instructionReg){
            case 0xA9:
                this.decoder()
                this.stepCount+=2
                break
            case 0xAD:
                this.decoder()
                this.stepCount++
                break
            case 0x8D:
                this.decoder()
                this.stepCount++
                break
            case 0x8A:
                this.stepCount+=2
                break
            case 0x98:
                this.stepCount+=2
                break
            case 0x6D:
                this.decoder()
                this.stepCount++
                break
            case 0xA2:
                this.decoder()
                this.stepCount+=2
                break
            case 0xAE:
                this.decoder()
                this.stepCount++
                break
            case 0xAA:
                this.stepCount+=2
                break
            case 0xA0:
                this.decoder()
                this.stepCount+=2
                break
            case 0xAC:
                this.decoder()
                this.stepCount++
                break
            case 0xA8:
                this.stepCount+=2
                break
            case 0xEA:
                this.stepCount+=2
                break
            case 0x00:
                this.stepCount+=2
                break
            case 0xEC:
                this.decoder()
                this.stepCount++
                break
            case 0xD0:
                this.decoder()
                this.stepCount+=2
                break
            case 0xEE:
                this.decoder()
                this.stepCount++
                break
            case 0xFF:
                this.decoder()
                this.stepCount++
                break
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
                this.stepCount+=3
                break
            case 0xAD:
                this.loadAccMem()
                this.stepCount+=3
                break
            case 0x8D:
                this.stoAccMem()
                this.stepCount+=3
                break
            case 0x8A:
                this.loadAccX()
                this.stepCount+=3
                break
            case 0x98:
                this.loadAccY()
                this.stepCount+=3
                break
            case 0x6D:
                //----------------------------------------------------------------------------
                
                this.stepCount+=3
                break
            case 0xA2:
                this.loadXCon()
                this.stepCount+=3
                break
            case 0xAE:
                this.loadXMem()
                this.stepCount+=3
                break
            case 0xAA:
                this.loadXAcc()
                this.stepCount+=3
                break
            case 0xA0:
                this.loadYCon()
                this.stepCount+=3
                break
            case 0xAC:
                this.loadYMem()
                this.stepCount+=3
                break
            case 0xA8:
                this.loadYAcc()
                this.stepCount+=3
                break
            case 0xEA:
                this.NOP()
                this.stepCount+=3
                break
            case 0x00:
                this.Break()
                this.stepCount+=3
                break
            case 0xEC:
                this.compare
                this.stepCount+=3
                break
            case 0xD0:
                this.Branch() //-------------------------------------------------
                this.stepCount+=3
                break
            case 0xEE:
                this.increment()
                this.stepCount++
                break
            case 0xFF:
                this.systemCall()
                this.stepCount+=3
                break
                
        }
    }
    public execute2(){
        this.tempStore = this.holder + 1
        this.stepCount++
    }
    public writeBack(){
        this.memUnit.writeImmidiate(this.holder,this.tempStore)
        this.stepCount++
    }
    public interrupt(){
        if(this.IRUnit.isIR == true){
            this.IRUnit.runFunct()
        }
        this.progCount++
        this.stepCount = 1
    }
    //decode 1
    public decoder(){
        this.tempStore = this.progCount+1
        this.memUnit.changeMAR(this.tempStore,true,false)
        this.holder = this.memUnit.CPURead()
    }
    //decode 2
    public decoder2(){
        this.tempStore = this.progCount+2
        this.memUnit.changeMAR(this.tempStore,true,false)
        
        this.holder2 = this.memUnit.CPURead()
    }
    //A9
    public loadAccCon(){
        this.accumulator = this.holder        
    }
    //AD
    public loadAccMem(){
        this.memUnit.changeMAR(this.holder,true,false)
        
        this.accumulator = this.memUnit.CPURead()
    }
    //8D
    public stoAccMem(){
        
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
        
        this.xReg = this.memUnit.CPURead()
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
        
        this.yReg = this.memUnit.CPURead()
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
    }
    //EC
    public compare(){
        this.memUnit.changeMAR(this.holder,true,false)
        
        this.xReg = this.memUnit.CPURead()
    }
    //D0
    public Branch(){
        if(this.zFlag = 0){
        this.progCount += this.holder //Need to set up negative numbers---------------------------------------------
        }
    }
    //EE
    public increment(){
        this.memUnit.changeMAR(this.holder,true,false)
        this.holder = this.memUnit.CPURead()
    }
    //FF
    public systemCall(){
        if(this.xReg == 1){
            this.stringHold = this.table.asciiToHex(this.yReg.toString())
            console.log(this.stringHold)
        }else if(this.xReg == 2){
            this.tempStore = this.yReg
            this.memUnit.changeMAR(this.tempStore,true,false)
            
            
            this.stringHold = this.table.asciiToHex(this.memUnit.CPURead().toString())
            console.log(this.stringHold)
        }else if(this.xReg == 3){
            this.memUnit.changeMAR(this.holder,true,false)
            
            this.stringHold = this.table.asciiToHex(this.memUnit.CPURead().toString())
            console.log(this.stringHold)
        }
    }
    public pulse(){
        this.ClockCount++;
        console.log("CPU State | Mode: 0 PC: " + this.progCount + " IR: " + this.instructionReg + " Acc: " + this.accumulator + " xReg: " + this.xReg + " yReg: " + this.yReg + " zReg: " + this.zFlag + " Step: " + this.stepCount + " Holder: "+this.holder)
        switch(this.stepCount){
            case 1:
                this.fetch()
                break
            case 2:
                this.decode()
                break
            case 3:
                this.decode2()
                break
            case 4:
                this.execute()
                break
            case 5:
                this.execute2()
                break
            case 6:
                this.writeBack()
                break
            case 7:
                this.interrupt()
                break
        }
    }


    private ClockCount : number = 0;
    constructor(memHolder,IRHolder) {
        super(0,"CPU",true);
        this.memUnit = memHolder;
        this.IRUnit = IRHolder
    }
}
