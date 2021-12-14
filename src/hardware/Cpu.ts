import {Hardware} from "../../dist/hardware/Hardware";
import { ClockListener } from "../../dist/hardware/imp/ClockListener";
import { MMU } from "../../dist/hardware/MMU";
import { IC } from "../../dist/hardware/InterruptController";
import { Ascii } from "./Ascii";

export class Cpu extends Hardware implements ClockListener {
    public MMUUnit: MMU;
    public ASCIIConv: Ascii;
    public IRUnit: IC;
    public stepCount: number = 1;              
    public zFlag: number = 1;
    public xReg: number = 0;
    public yReg: number = 0;
    public accu: number = 0;                 
    public IReg: number = 0;                
    public progCount: number = 0x0000;   
    public holder: number = 0;                      
    public stepTwo: boolean = false;         
    constructor(memHolder, IR) {
        super(0, "CPU", true);
        this.MMUUnit = memHolder;
        this.ASCIIConv = new Ascii();
        this.IRUnit = IR;
    }
    //fetch step
    private fetch(){
        this.MMUUnit.setMARCPU(this.progCount);        
        this.MMUUnit.readCPU();                             
        this.IReg = this.MMUUnit.getMDRCPU();       
        this.stepCount++;                                 
    }
    //decode step
    private decode(){
        switch (this.IReg){
            case 0xA9:
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.stepCount++;
                    break;
            case 0xAD:
                if (!this.stepTwo){      
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.hexAddress(this.holder, false, true);     
                    this.stepTwo = true;                         
                }else{
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.setMARCPU(this.MMUUnit.hexAddress(this.holder, false, false));  
                    this.stepCount++;                                 
                    this.stepTwo = false;                        
                }
                break;
            case 0xEC:
                if (!this.stepTwo){      
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.hexAddress(this.holder, false, true);     
                    this.stepTwo = true;                         
                }else{
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.setMARCPU(this.MMUUnit.hexAddress(this.holder, false, false));  
                    this.stepCount++;                                 
                    this.stepTwo = false;                        
                }
                break;
            case 0x6D:
                if (!this.stepTwo){      
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.hexAddress(this.holder, false, true);     
                    this.stepTwo = true;                         
                }else{
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.setMARCPU(this.MMUUnit.hexAddress(this.holder, false, false));  
                    this.stepCount++;                                 
                    this.stepTwo = false;                        
                }
                break;
            case 0xD0:
                if (this.zFlag != 0){               
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.stepCount++;         
                }else{                          
                    this.stepCount = 5;
                    this.progCount += 2;
                }
                break;
            case 0x00:
                this.stepCount++;
                break;
            case 0xEE:
                if (!this.stepTwo){      
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.hexAddress(this.holder, false, true);     
                    this.stepTwo = true;                         
                }else{
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.setMARCPU(this.MMUUnit.hexAddress(this.holder, false, false));  
                    this.stepCount++;                                 
                    this.stepTwo = false;                        
                }
                break;
            case 0xFF:
                if (!this.stepTwo){      
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.hexAddress(this.holder, false, true);     
                    this.stepTwo = true;                         
                }else{
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.setMARCPU(this.MMUUnit.hexAddress(this.holder, false, false));  
                    this.stepCount++;                                 
                    this.stepTwo = false;                        
                }
                break;
            case 0x8D:
                if (!this.stepTwo){      
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.hexAddress(this.holder, false, true);     
                    this.stepTwo = true;                         
                }else{
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.setMARCPU(this.MMUUnit.hexAddress(this.holder, false, false));  
                    this.stepCount++;                                 
                    this.stepTwo = false;                        
                }
                break;
            case 0xAC:
                if (!this.stepTwo){      
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.hexAddress(this.holder, false, true);     
                    this.stepTwo = true;                         
                }else{
                    this.MMUUnit.setMARCPU(this.progCount + 1);     
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();          
                    this.MMUUnit.setMARCPU(this.MMUUnit.hexAddress(this.holder, false, false));  
                    this.stepCount++;                                 
                    this.stepTwo = false;                        
                }
                break;
            case 0xA2:
                this.MMUUnit.setMARCPU(this.progCount + 1);     
                this.MMUUnit.readCPU();                          
                this.stepCount++;
                break;
        }
    }
    //All Execute programs
    private execute(){
        switch (this.IReg){
            case 0xA9:
                this.accu = this.MMUUnit.getMDRCPU();     
                this.stepCount = 5;                            
                this.progCount += 2;                           
                break;
            case 0xAD:
                if (!this.stepTwo){
                    this.MMUUnit.readCPU();                          
                    this.stepTwo = true;                         
                }else{
                    this.accu = this.MMUUnit.getMDRCPU();     
                    this.stepCount = 5;                            
                    this.progCount += 3;                           
                    this.stepTwo = false;                        
                }
                break;
            case 0xEC:
                if (!this.stepTwo){
                    this.MMUUnit.readCPU();                          
                    this.holder = this.MMUUnit.getMDRCPU();         
                    this.stepTwo = true;                         
                }else{
                    if (this.xReg == this.holder){
                        this.zFlag = 1;
                    }
                    this.stepCount = 5;                            
                    this.progCount += 3;                           
                    this.stepTwo = false;                        
                }
                break;
            case 0x6D:
                if (!this.stepTwo){
                    this.MMUUnit.readCPU();                          
                    this.stepTwo = true;                         
                }else{
                    this.accu += this.MMUUnit.getMDRCPU();    
                    this.stepCount = 5;                            
                    this.progCount += 3;                           
                    this.stepTwo = false;                        
                    }
                break;
            case 0xD0:
                let jumpdistance = this.MMUUnit.getMDRCPU();    
                // 2's comp and moves the program counter
                if (jumpdistance <= 0x7F) {
                this.progCount += jumpdistance;
                }
                else {
                this.progCount -= (0x100-jumpdistance);
                }
                this.stepCount = 5;                            
                this.progCount += 2;                           
                break;
            case 0x00:
                process.exit();    
            case 0xEE:
                if (!this.stepTwo){
                    this.MMUUnit.readCPU();                          
                    this.stepTwo = true;                         
                }else{
                    this.holder = this.MMUUnit.getMDRCPU() + 1;     
                    this.MMUUnit.writeImmediate(this.MMUUnit.getMARCPU(), this.holder); 
                    this.holder = this.MMUUnit.getMDRCPU();
                    this.stepCount = 4;                           
                    this.progCount += 3;                           
                    this.stepTwo = false;                        
                }
                break;
            case 0xFF:
                if(this.xReg == 1){
                    console.log(this.yReg);
                    this.progCount += 1;
                }else if(this.xReg == 2){
                    this.MMUUnit.readCPU();
                    this.progCount += 3;
                    console.log(this.ASCIIConv.hexToASCII(this.MMUUnit.getMDRCPU()));
                }         
                this.stepCount = 5;                           
                break;
            case 0x8D:
                this.MMUUnit.writeImmediate(this.MMUUnit.getMARCPU(), this.accu);
                this.stepCount = 5;
                this.progCount += 3;                           
                break;
            case 0xAC:
                this.MMUUnit.readCPU();
                this.yReg = this.MMUUnit.getMDRCPU();
                this.progCount += 3;
                this.stepCount = 5;
                break;
            case 0xA2:
                this.xReg = this.MMUUnit.getMDRCPU();
                this.progCount += 2;
                this.stepCount = 5;
                break;
        }
    }
    //Interrupt checker
    public interrupt(){
        if(this.IRUnit.isIR == true){
            this.IRUnit.runFunct();
        }
        this.stepCount = 1;
    }
    //Writeback post
    private writeBack(){
        switch (this.IReg){
            case 0xEE:
                Hardware.log("New value is " + this.holder);    
                this.stepCount = 5;       
                break;
        }
    }
    public pulse(){
        switch (this.stepCount){
            case 1:
                this.fetch();
                break;
            case 2: 
                this.decode();
                break;
            case 3:  
                this.execute();
                break;
            case 4:   
                this.writeBack();
                break;
            case 5:
                this.interrupt();
                break;
        }
    }
}
