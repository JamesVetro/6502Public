// import statements for hardware
import {Cpu} from "./hardware/Cpu";
import {Hardware} from "./hardware/Hardware";
import { Memory } from "./hardware/Memory";
import { Clock } from "./hardware/Clock";
import { MMU } from "./hardware/MMU";
import { IC } from "./hardware/InterruptController"
import { keyboard } from "./hardware/Keyboard"
import { runInThisContext } from "vm";

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
    private _MMU: MMU = null;
    private _IC: IC = null;
    private _keyboard: keyboard = null;
    public running: boolean = false;

    constructor() {
        super(0,"System");
        console.log("Hello TSIRAM!");

        //creates the initial components
        this._Mem = new Memory();
        this._Clock = new Clock();
        this._MMU = new MMU(this._Mem);
        this._IC = new IC();
        this._keyboard = new keyboard(this._IC);
        this._CPU = new Cpu(this._MMU,this._IC);
        
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
        //all the write immidiates for the first test program
        // load constant 0
        this._MMU.writeImmidiate(0x0000, 0xA9);
        this._MMU.writeImmidiate(0x0001, 0x00);
        // write acc (0) to 0040
        this._MMU.writeImmidiate(0x0002, 0x8D);
        this._MMU.writeImmidiate(0x0003, 0x40);
        this._MMU.writeImmidiate(0x0004, 0x00);
        // load constant 1
        this._MMU.writeImmidiate(0x0005, 0xA9);
        this._MMU.writeImmidiate(0x0006, 0x01);
        // add acc (?) to mem 0040 (?)
        this._MMU.writeImmidiate(0x0007, 0x6D);
        this._MMU.writeImmidiate(0x0008, 0x40);
        this._MMU.writeImmidiate(0x0009, 0x00);
        // write acc ? to 0040
        this._MMU.writeImmidiate(0x000A, 0x8D);
        this._MMU.writeImmidiate(0x000B, 0x40);
        this._MMU.writeImmidiate(0x000C, 0x00);
        // Load y from memory 0040
        this._MMU.writeImmidiate(0x000D, 0xAC);
        this._MMU.writeImmidiate(0x000E, 0x40);
        this._MMU.writeImmidiate(0x000F, 0x00);
        // Load x with constant (1) (to make the first system call)
        this._MMU.writeImmidiate(0x0010, 0xA2);
        this._MMU.writeImmidiate(0x0011, 0x01);
        // make the system call to print the value in the y register (3)
        this._MMU.writeImmidiate(0x0012, 0xFF);
        // Load x with constant (3) (to make the second system call for the string)
        this._MMU.writeImmidiate(0x0013, 0xA2);
        this._MMU.writeImmidiate(0x0014, 0x03);
        // make the system call to print the value in the y register (3)
        this._MMU.writeImmidiate(0x0015, 0xFF);
        this._MMU.writeImmidiate(0x0016, 0x50);
        this._MMU.writeImmidiate(0x0017, 0x00);
        // test DO (Branch Not Equal) will be NE and branch (0x0021 contains 0x20 and xReg contains B2)
        this._MMU.writeImmidiate(0x0018, 0xD0);
        this._MMU.writeImmidiate(0x0019, 0xED);
        // globals
        this._MMU.writeImmidiate(0x0050, 0x2C);
        this._MMU.writeImmidiate(0x0052, 0x00);

        this._Mem.dispCont(0x0000,0x0052);
        this._Clock.addListener(this._CPU);
        this._Clock.addListener(this._Mem);
        this._Mem.setMAR(0x10)
        console.log(this._Mem.getMAR())
        return true;
    }
// function to stop the system
    public stopSystem(): boolean {

        return false;

    }
}

let system: System = new System();
