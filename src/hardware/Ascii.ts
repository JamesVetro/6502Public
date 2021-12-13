
export class Ascii {
    private asciiTable: string[] = null;

    //Create array and populate
    constructor() {
        let uselessChars: string = "NUL SOH STX ETX EOT ENQ ACK BEL BS HT LF VT FF CR SO SI DLE DC1 DC2 DC3 DC4 NAK SYN ETB CAN EM SUB ESC FS GS RS US";
        let mainChars = "! \" # $ % & ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; < = > ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ DEL";
        let array1 = uselessChars.split(" ");
        let array2 = " ";
        let array3 = mainChars.split(" ");
        this.asciiTable.concat(array1, array2, array3);
    }
    
    //Returns ASCII value at index
    public hexToASCII(hex: number) {
        let hexStr = hex.toString();
        let dec = parseInt(hexStr, 16);
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
    //Searches array for ASCII returns the index in hexadecimal
    public asciiToHex(ascii: string){
        for (let i = 0; i < this.asciiTable.length; i++) {
            if (this.asciiTable[i] == ascii) {
                let hexNum = this.hexConv(i, 2);
                return hexNum;
            }
        }
    }
}