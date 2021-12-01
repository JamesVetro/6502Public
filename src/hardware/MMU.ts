import {System} from "../System";
import {Hardware} from "./Hardware";
import { Memory } from "./Memory";
import { Cpu } from "./Cpu"
export class MMU extends Hardware{
    public Mem: Memory
    public addPiece: number
    public fullHalf: boolean
    public highLow: boolean
    public HLcount: number
    public HLstore: number
    public reader: number
    //This function takes in a number, sent by the CPU, as either a full 16 bit number, or half. If its full, it just sets it to MAR
        //if its half, it checks if its high or low order, then concatinates accordingly. 
    public changeMAR(addPiece, fullHalf, highLow){
        if(fullHalf == true){
            this.Mem.setMAR(addPiece)
        }else if(highLow==true){
            addPiece = addPiece*0x100
            this.HLstore = this.HLstore + addPiece
            this.HLcount++
            if(this.HLcount==2){
                this.HLstore = this.HLstore+addPiece
                this.Mem.setMAR(this.HLstore)
                this.HLcount = 1
                this.HLstore = 0x0
            }
        }else{
            this.HLstore = this.HLstore + addPiece
            this.HLcount++
            if(this.HLcount==2){
                this.HLstore = this.HLstore+addPiece
                this.Mem.setMAR(this.HLstore)
                this.HLcount = 1
                this.HLstore = 0x0
            }
        }
    }
    //functions to allow the CPU to read through the MMU, as well as change the MDR
    public CPURead(){
        this.reader = this.Mem.read();
        
    }
    public CPUWrite(){
        this.Mem.write()
    }
    public changeMDR(setItemMDR){
        this.Mem.setMDR(setItemMDR)
    }
    //function to immidiately write to a specific location in memory based on input
    public writeImmidiate(pos,data){
        this.Mem.setMAR(pos)
        this.Mem.setMDR(data)
        this.Mem.write()
    }

    constructor(Mempoint) {
        super(0,"MMU",true);
        this.Mem = Mempoint
    }
}
