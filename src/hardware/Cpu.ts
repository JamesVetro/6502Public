import {System} from "../System";
import {Hardware} from "./Hardware";

export class Cpu extends Hardware implements ClockListener{


    constructor() {
        super(0,"CPU",false);
        
    }
}
