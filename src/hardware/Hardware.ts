export class Hardware {
    id: number;
    name: string;
    debug: boolean = true;
    constructor(id, name, debug?) {
        this.id = id;
        this.name = name;
        this.debug = debug;
    }
    // Prints out the log message if debugging is on
    public log(msg) {
        if (this.debug == true) {
            let dateTime = new Date().getTime();
            console.log("[HW - " + this.name + " id: " + this.id + " - " + dateTime + "]: " + msg);
        }
    }
    // Converts the hex value of the array into a string and returns it
    public hexLog(num,len){
        let hex : string = num.toString(16).toUpperCase();
        return hex.padStart(len,'0');
    }

}