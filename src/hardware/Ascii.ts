export class Ascii {
    private asciiTable: string[] = null;

    //Populates ASCII table with ASCII values
    constructor() {
        let asciiList: string = "NUL SOH STX ETX EOT ENQ ACK BEL BS HT LF VT FF CR SO SI DLE DC1 DC2 DC3 DC4 NAK SYN ETB CAN EM SUB ESC FS GS RS US \xa0 ! \" # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ DEL";
        this.asciiTable = asciiList.split(" ");
    }
    
    //Returns the ASCII value at the specified index
    public hexToASCII(hex: number) {
        let hexStr = hex.toString();
        let dec = parseInt(hexStr);
        return this.asciiTable[dec];
    }
    public hexConv(num,len){
        let hex : string = num.toString(16).toUpperCase();
        let padding : string = "";
        for (let i = len; i > hex.length; i--){
            padding += "0";
            }
        return padding + hex;
        }
    //Searches array for the specified ASCII value and returns the index it's at in hexadecimal
    public asciiToHex(ascii: string){
        for (let i = 0; i < this.asciiTable.length; i++) {
            if (this.asciiTable[i] == ascii) {
                let hexNum = this.hexConv(i, 2);
                return hexNum;
            }
        }
    }
}