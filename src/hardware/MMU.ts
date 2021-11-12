import {System} from "../System";
import {Hardware} from "./Hardware";
import { Memory } from "./Memory";
import { Cpu } from "./Cpu"
export class MMU extends Hardware{

    public changeMAR(addPiece, fullHalf, highLow){

    }


    constructor() {
        super(0,"MMU",true);
    }
}
