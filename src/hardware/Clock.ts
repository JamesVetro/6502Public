import {System} from "../System";
import {Hardware} from "./Hardware";
import {Memory} from "./Memory"
import {Cpu} from "./Cpu"
import { ClockListener } from "./imp/Clocklistener";
import { setInterval } from "timers";

export class Clock extends Hardware{
    //the array of listeners to the clock
    private listenerarr : ClockListener[];
    private setInterval=setInterval
    //add listener fills the array of listeners to the clock//
    public addListener(listener){
        this.listenerarr.push(listener);
    }
    //clockrun sends out a pulse to each listener in the array every time it is run
    public clockRun(){
        for (let i = 0; i < this.listenerarr.length; i++){
            this.listenerarr[i].pulse()
        }
    } 
    constructor(){
        super(0,Clock)
        this.listenerarr = new Array();
        //every 100 ms, setinterval calls clockrun to pulse the listeners
        setInterval(() => this.clockRun(),100)
    }
}