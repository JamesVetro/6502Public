import {System} from "../System";
import {Hardware} from "./Hardware";
import {Memory} from "./Memory"
import {Cpu} from "./Cpu"
import { ClockListener } from "./imp/Clocklistener";
import { setInterval } from "timers";

export class Clock extends Hardware{
    private listenerarr : ClockListener[];

    private setInterval=setInterval
    public addListener(listener){
        this.listenerarr.push(listener);
    }
    public clockRun(){
        for (let i = 0; i < this.listenerarr.length; i++){
            this.listenerarr[i].pulse()
        }
    } 
    constructor(){
        super(0,Clock)
        this.listenerarr = new Array();
        setInterval(() => this.clockRun(),100)
    }
}