import { Memory } from "./Memory";

export class Ascii {
    public asciiTable: string[];
    private memTest: Memory;
    // Makes array with all ASCII characters
    constructor() {
        let asciiChart: string = "NUL SOH STX ETX EOT ENQ ACK BEL BS HT LF VT FF CR SO SI DLE DC1 DC2 DC3 DC4 NAK SYN ETB CAN EM SUB ESC FS GS RS US \xa0 ! \" # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ DEL";
        this.asciiTable = asciiChart.split(" ");
    }
    // Converts hex to ASCII
    public hexToASCII(hex) {
        let hexStr = hex.toString();
        let dec = parseInt(hexStr);
        return this.asciiTable[dec];
    }
    // Converts from ASCII to hex
    public asciiToHex(ascii){
        for (let i = 0; i < this.asciiTable.length; i++) {
            if (this.asciiTable[i] == ascii) {
                let hexNum = this.memTest.hexLog(i, 2);
                return hexNum;
            }
        }
    }
}