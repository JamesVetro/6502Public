import { time, timeEnd, timeLog, timeStamp } from "console";
import { homedir } from "os";
import { pathToFileURL } from "url";
import {System} from "../System";
import {Cpu} from "./Cpu";
import { Memory } from "./Memory";
import { Clock } from "./Clock";
export class Hardware {
    private debug : boolean;
    private idNum : number;
    private name : string;
    constructor(idNum, name, debug=true) {
        this.debug=debug;
        this.idNum=idNum;
        this.name=name;
       
    } 
    //simple function that posts whenever it recieves a clock pulse
    public pulse(){
        console.log("received clock pulse");
    }
    //function that converts numbers to hex and pads them to 4 spaces
    public hexLog(num,len){
        let hex : string = num.toString(16).toUpperCase();
        let padding : string = "";
        for (let i = len-1; i > hex.length, i--;){
            padding += "0";
            }
        return padding + hex;
        }
        //function that posts whenever a new piece of hardware is created
    public log(){
        if(this.debug == true){
        console.log("HW - "+this.name+" id: "+this.idNum+" - "+Date.now())
    } 
    } 
}

