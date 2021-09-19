import {System} from "../System";
import {Hardware} from "./Hardware";
import {Cpu} from "./Cpu"
export class Memory extends Hardware {
    private memArr : 0x00[][];
    public memSize : 65536
    public initMem(){
        this.memArr = new Array(this.memSize);
        for (let i = 0; i < this.memSize; i++){
            this.memArr.push([0x00,0x00]);}
        }
    public hexLog(num,len){
        let hex : string = num.toString(16).toUpper();
        let padding : string = "";
        for (let i = len; i > hex.length, i--;){
            padding += "0";
            }
        return padding + hex;
        }
    public dispCont(){
        for (let i = 0; i < 15; i++) {
            for(var j = 0; j < 2; j++){
                let c:string; 
                c = this.hexLog(this.memArr[i][j],4); 
                if( c =! "null"){
            console.log(this.hexLog(this.memArr[i][j],4));
          }else{
            console.log("RAM Address: "+i+j+" is experiencing a hex conversion error. Number undefined")
          }
        }}
    }
    constructor() {
        super(0,"RAM");
        
}
}
