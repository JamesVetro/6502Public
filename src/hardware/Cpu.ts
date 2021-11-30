import {System} from "../System";
import {Hardware} from "./Hardware";
import {ClockListener} from "./imp/Clocklistener";
import { Clock } from "./Clock";
import { MMU } from "./MMU"
export class Cpu extends Hardware implements ClockListener{
    //Function that counts the amount of pulses its recieved and posts the message with that number to the console
    public memUnit: MMU
    public pulse(){
        this.ClockCount++;
        console.log("received clock pulse - CPU Clock Count: " + this.ClockCount);
    }
    

    private ClockCount : number = 0;
    constructor(count,memHolder) {
        super(0,"CPU",true);
        this.memUnit = memHolder;
    }
}
