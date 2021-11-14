import { time, timeEnd, timeLog, timeStamp } from "console";
import { homedir } from "os";
import { pathToFileURL } from "url";
import {System} from "../System";
import {Cpu} from "./Cpu";
import { Memory } from "./Memory";
import { Clock } from "./Clock";
import { MMU } from "./MMU"
export class Hardware {
    private debug : boolean;
    private idNum : number;
    private name : string;
    private arraylength :number;
    constructor(idNum, name, debug=true,arraylength=0) {
        this.debug=debug;
        this.idNum=idNum;
        this.name=name;
       this.arraylength = arraylength
    } 
    //simple function that posts whenever it recieves a clock pulse
    public pulse(){
        console.log("received clock pulse");
    }
    //function that converts numbers to hex and pads them to 2 spaces
    public hexLog(num,len){
        let hex : string = num.toString(16).toUpperCase();
        let padding : string = "";
        for (let i = len; i > hex.length; i--){
            padding += "0";
            }
        return padding + hex;
        }
        //function that posts whenever a new piece of hardware is created
    public log(){
        if(this.debug == true){
        console.log("HW - "+this.name+" id: "+this.idNum+" - "+Date.now())
    } else {
        console.log("HW - "+this.name+" id: "+this.idNum+" - "+Date.now()+" Created - Addressable space : "+this.arraylength)
    }
    } 
}

