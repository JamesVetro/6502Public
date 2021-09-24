import {System} from "../System";
import {Hardware} from "./Hardware";
import {ClockListener} from "./imp/Clocklistener"
import { Memory } from "./Memory";
import { Clock } from "./Clock";
export class Cpu extends Hardware implements ClockListener{
    public pulse(){
        this.ClockCount++;
        console.log("received clock pulse - CPU Clock Count: " + this.ClockCount);
    }
    private ClockCount
    constructor(count) {
        super(0,"CPU",false);
    }
}
