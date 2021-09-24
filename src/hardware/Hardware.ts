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
    public pulse(){
        console.log("received clock pulse");
    }
    public hexLog(num,len){
        let hex : string = num.toString(16).toUpperCase();
        let padding : string = "";
        for (let i = len-1; i > hex.length, i--;){
            padding += "0";
            }
        return padding + hex;
        }
    public log(){
        if(this.debug == true){
        console.log("HW - "+this.name+" id: "+this.idNum+" - "+Date.now())
    } 
    } 
}

