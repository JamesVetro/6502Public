// import statements for hardware
import {Cpu} from "./hardware/Cpu";
import {Hardware} from "./hardware/Hardware";
import { Memory } from "./hardware/Memory";
import { Clock } from "./hardware/Clock";

/*
    Constants
 */
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL= 500;               // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
                                        // A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
                                        // .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
                                        // small, I recommend a setting of 100, if you want to slow things down
                                        // make it larger.


export class System extends Hardware{

    private _CPU : Cpu = null;
    private _Mem : Memory = null;
    private _Clock: Clock = null;
    public running: boolean = false;

    constructor() {
        super(0,"System");
        console.log("Hello TSIRAM!");

        //creates the initial components
        this._CPU = new Cpu(0);
        this._Mem = new Memory();
        this._Clock = new Clock();
        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */

        this.startSystem();

    }
//system starts, begins clock, begins each hardware piece, and gives the clock its listeners
    public startSystem(): boolean {
        this.log()
        this._CPU.log();
        this._Mem.initMem();
        this._Mem.dispCont();
        this._Clock.addListener(this._CPU);
        this._Clock.addListener(this._Mem);
        return true;
        
    }
// function to stop the system
    public stopSystem(): boolean {

        return false;

    }
}

let system: System = new System();
