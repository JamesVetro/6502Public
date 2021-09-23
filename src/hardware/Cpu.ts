import {System} from "../System";
import {Hardware} from "./Hardware";
import {ClockListener} from "./imp/Clocklistener"
export class Cpu extends Hardware implements ClockListener{

    private ClockCount
    constructor(count) {
        super(0,"CPU",false);
        
    }
}
