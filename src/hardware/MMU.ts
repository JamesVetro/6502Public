import { Hardware } from "./Hardware";
import { Memory } from "./Memory";

export class MMU extends Hardware {
    private LowByte: number = 0;
    private HighByte: number = 0;
    private byteCounter: number = 0;
    public readHolder: number = 0;
    private Mem: Memory = null;
    constructor(mem: Memory) {
        super(0, 'MMU', true);
        this.Mem = mem;
        this.log("created");
    }
    // Setter for low order bit
    public setLowBit(hexVal){
        this.LowByte = hexVal;
    }
    //getter for low order bit
    public getLowBit(){
        return this.LowByte;
    }
    // setter for high order bit
    public setHighBit(hexVal){
        this.HighByte = hexVal;
    }
    // Getter for high order bit
    public getHighBit(){
        return this.HighByte;
    }
    // Converts into readable hex
    public hexAddress(add, fullHex, highBit){
        if(fullHex == true){
            return add;
        }else if(highBit == true){ 
            if(this.byteCounter == 1){ 
                let hexStr: string = this.getLowBit.toString().concat(add.toString());
                let hex = parseInt(hexStr); 
                this.byteCounter = 0; 
                return hex;
            }else{
                this.setHighBit(add);
                this.byteCounter = 1;
            }
        }else{
            if(this.byteCounter == 1){ 
                let lowOrder: string = add.toString();
                let hexStr: string = lowOrder.concat(this.getHighBit.toString());
                let hex = parseInt(hexStr); 
                this.byteCounter = 0; 
                return hex;
            }else{
                this.setLowBit(add);
                this.byteCounter = 1;
            }
        }
    }
    // Updates a certain location in the memory with given data
    public readImmediate(address, data) {
        this.Mem.setMAR(address);
        this.Mem.setMDR(data);
        let memArr = this.Mem.getMemoryArr();
        this.Mem.write();
    }
    //Write a program operand into memory
    public writeImmediate(address, data) {
        let memArr = this.Mem.getMemoryArr();
        memArr[address] = data;
        this.Mem.setMemoryArr(memArr);
    }
    //Flash memory with a static program
    public testProgram(){
        // load constant 0
        this.writeImmediate(0x0000, 0xA9);
        this.writeImmediate(0x0001, 0x00);
        // write acc (0) to 0040
        this.writeImmediate(0x0002, 0x8D);
        this.writeImmediate(0x0003, 0x40);
        this.writeImmediate(0x0004, 0x00);
        // load constant 1
        this.writeImmediate(0x0005, 0xA9);
        this.writeImmediate(0x0006, 0x01);
        // add acc (?) to mem 0040 (?)
        this.writeImmediate(0x0007, 0x6D);
        this.writeImmediate(0x0008, 0x40);
        this.writeImmediate(0x0009, 0x00);
        // write acc ? to 0040
        this.writeImmediate(0x000A, 0x8D);
        this.writeImmediate(0x000B, 0x40);
        this.writeImmediate(0x000C, 0x00);
        // Load y from memory 0040
        this.writeImmediate(0x000D, 0xAC);
        this.writeImmediate(0x000E, 0x40);
        this.writeImmediate(0x000F, 0x00);
        // Load x with constant (1) (to make the first system call)
        this.writeImmediate(0x0010, 0xA2);
        this.writeImmediate(0x0011, 0x01);
        // make the system call to print the value in the y register (3)
        this.writeImmediate(0x0012, 0xFF);
        // Load x with constant (3) (to make the second system call for the string)
        this.writeImmediate(0x0013, 0xA2);
        this.writeImmediate(0x0014, 0x03);
        // make the system call to print the value in the y register (3)
        this.writeImmediate(0x0015, 0xFF);
        this.writeImmediate(0x0016, 0x50);
        this.writeImmediate(0x0017, 0x00);
        // test DO (Branch Not Equal) will be NE and branch (0x0021 contains 0x20 and xReg contains B2)
        this.writeImmediate(0x0018, 0xD0);
        this.writeImmediate(0x0019, 0xED);
        // globals
        this.writeImmediate(0x0050, 0x2C);
        this.writeImmediate(0x0052, 0x00);
    }
    
    // Displays memory for the given range
    public memoryDump(fromAddress, toAddress){
        this.log("Initialized memory");
        this.log("Memory Dump: Debug");
        this.log("-------------------------------------");
        for(let i = fromAddress; i <= toAddress; i++){
            let memAdrr = this.hexLog(i, 4);
            let dataVal = this.Mem.hexArray[i];
            let memNum = this.hexLog(dataVal, 2);
            if (dataVal == undefined || dataVal == null){
                this.log("Addr " + memAdrr + ":  |  " + memNum + " ERR: number undefined");
            }else{
                this.log("Addr " + memAdrr + ":  |  " + memNum);
            }
        }
        this.log("-------------------------------------");
        this.log("Memory Dump: Complete");
    }
    public readCPU(){
        this.readHolder = this.Mem.read();
    }
    public setMARCPU(mar){
        this.Mem.setMAR(mar);
    }
    public getMARCPU(){
        return this.Mem.getMAR();
    }
    public setMDRCPU(mdr){
        this.Mem.setMDR(mdr);
    }

    public getMDRCPU(){
        return this.Mem.getMDR();
    }
    //Pulse Method
    pulse() {
        this.log("Received clock pulse");
    }

}