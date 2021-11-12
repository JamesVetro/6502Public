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
    public changeMAR(addPiece, fullHalf, highLow){
        if(fullHalf == true){
            this.Mem.setMAR(addPiece)
        }else if(highLow==true){
            addPiece = addPiece*0x100
            this.HLstore = this.HLstore + addPiece
            this.HLcount++
            if(this.HLcount==2){
                this.Mem.setMAR(this.HLstore)
                this.HLcount = 0
                this.HLstore = 0x0
            }
        }else{
            this.HLstore = this.HLstore + addPiece
            this.HLcount++
            if(this.HLcount==2){
                this.Mem.setMAR(this.HLstore)
                this.HLcount = 0
                this.HLstore = 0x0
            }
        }
    }
    public CPURead(){
        this.Mem.read()
    }
    public CPUWrite(){
        this.Mem.write()
    }
    public changeMDR(setItemMDR){
        this.Mem.setMDR(setItemMDR)
    }
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
