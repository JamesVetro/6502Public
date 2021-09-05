import { time, timeEnd, timeLog, timeStamp } from "console";
import { homedir } from "os";
import { pathToFileURL } from "url";
import {System} from "../System";
import {Cpu} from "./Cpu";
export class Hardware {
    private debug : boolean;
    private idNum : number;
    private name : string;
    constructor(idNum, name, debug=true) {
        this.debug=debug;
        this.idNum=idNum;
        this.name=name;
       
    } 
    public log(){
        if(this.debug == true){
        console.log("HW - "+this.name+" id: "+this.idNum+" - "+Date.now())
    } 
    } 
}

