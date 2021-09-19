#! /usr/bin/env node

  
///////////////////////////////////////////////////////////////////////////////////
//
//  [Homework] Box It Script - 1
//
//  Box a List of Words in The CLI
//  In this homework, you will create a script that can take any number of arguments 
//  then outputs them inside boxes.
//  A short disclaimer about the examples, the output will look much better in your 
//  terminal. 
//  Auther: Harry Ji 
//  Date: Sep-12-2021  
///////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////
//
//  Breaking It Down
//
//  drawLine Function
//  Write a drawLine function that takes a number as an argument that returns 
//  that number of horizontal bars (i.e. `━`) as a string.
//
///////////////////////////////////////////////////////////////////////////////////

function drawLine(num){
    return '\u2500'.repeat(num);
}

///////////////////////////////////////////////////////////////////////////////////
//
//  drawTopBorder, drawMiddleBorder and drawBottomBorder Functions
//  Write three functions: drawTopBorder, drawMiddleBorder and drawBottomBorder. 
//  Each function should take a number, return a line of length includingcorner 
//  pieces. You can make use of drawLine to implement these functions.
//
///////////////////////////////////////////////////////////////////////////////////

function drawTopBorder(num){ 
     return "\u250C"+'\u2500'.repeat(num)+"\u2510";
}
function drawMiddleBorder(num){     
     return "\u251C"+'\u2500'.repeat(num)+"\u2524";
}
function drawBottomBorder(num){         
     return "\u2514"+'\u2500'.repeat(num)+"\u2518";
}

///////////////////////////////////////////////////////////////////////////////////
//
//  drawBarsAround Function
//  Write a drawBarsAround function that takes a string, surrounds it with 
//  vertical lines then returns it. 
//
///////////////////////////////////////////////////////////////////////////////////
 
function drawBarsAround(string){         
     return "\u2502"+string+"\u2502";
}
 
///////////////////////////////////////////////////////////////////////////////////
//
//  boxIt Function
//  Write a boxIt function that takes an array of strings and returns a string 
//  where each is in a single column table. To add "new lines" to a string, 
//  use the \n special character. In a string, \n characters will display as new lines
//  when logged with console.log(...).
//
///////////////////////////////////////////////////////////////////////////////////
 
function boxIt(ar){
     let return_string='';
     let max_length=0;
 
     for(let i=0;i<ar.length;i++){ 
         if(ar[i].length>max_length){
             max_length=ar[i].length;
         }
     } 
     //console.log(max_length);
     return_string = "\u250C"+'\u2500'.repeat(max_length)+"\u2510" +"\n";    
     for(i=0;i<ar.length;i++){
         return_string += "\u2502"+ar[i]+' '.repeat(max_length-ar[i].length)+"\u2502" +"\n";    
         if(i==ar.length-1){
             return_string += "\u2514"+'\u2500'.repeat(max_length)+"\u2518" +"\n";
         }else{
             return_string += "\u251C"+'\u2500'.repeat(max_length)+"\u2524" +"\n";
         }
 
     }
     return return_string;
 
 }

///////////////////////////////////////////////////////////////////////////////////
//
//  Piecing It All Together
//  Turn your file into a script allowing anyone to use it from the command line 
//  (i.e. bash) as follows:
//  where each is in a single column table. To add "new lines" to a string, 
//  use the \n special character. In a string, \n characters will display as new lines
//  when logged with console.log(...).   
//
///////////////////////////////////////////////////////////////////////////////////

if(process.argv.length==2){
    console.log("\u250C"+"\u2510");
    console.log("\u2514"+"\u2518");
}else{   
    // Stretch Add support to read CSV files and output the results
    if(process.argv[2].includes(".csv")){
       // console.log(process.argv[2]);
       var fs = require("fs");
       var text = fs.readFileSync(process.argv[2], 'utf-8');
       var textByLine = text.split('\n');
      
       //console.log(textByLine);
       let max_length_0=0; 
       let max_length_1=0;
       let text_without_empty =new Array;
       for(let i=0;i<textByLine.length;i++){ 
           if(textByLine[i]){
                text_without_empty.push(textByLine[i]);
                ar=textByLine[i].split(",");                
                if(ar[0].length>max_length_0){
                    max_length_0=ar[0].length;
                }
                if(ar[1].length>max_length_1){
                    max_length_1=ar[1].length;
                }
            }
       }
       //console.log(text_without_empty);
       //console.log(max_length_0);
       //console.log(max_length_1);

       return_string = "\u250C"+'\u2500'.repeat(max_length_0)+"\u252C"+'\u2500'.repeat(max_length_1)+"\u2510" +"\n";    
       for(let i=0;i<text_without_empty.length;i++){             
            ar=text_without_empty[i].split(",");
            return_string += "\u2502"+ar[0]+' '.repeat(max_length_0-ar[0].length)+"\u2502";
            return_string += ar[1]+' '.repeat(max_length_1-ar[1].length)+"\u2502" +"\n";    
            if(i==text_without_empty.length-1){
                return_string += "\u2514"+'\u2500'.repeat(max_length_0)+'\u2534'+'\u2500'.repeat(max_length_1)+"\u2518" +"\n";
            }else{
                return_string += "\u251C"+'\u2500'.repeat(max_length_0)+"\u253C"+'\u2500'.repeat(max_length_1) +"\u2524" +"\n";
            }            
       }
       console.log(return_string);        

    }else{
        let ar=new Array;
        for(i=2;i<process.argv.length;i++){
            ar.push(process.argv[i]);
        }
        console.log(boxIt(ar));
    }
}


 /*  this is for testing 
 console.log(drawLine(4));
 console.log(drawLine(8));
 console.log(drawTopBorder(4)); // returns '┏━━━━┓'
 console.log(drawTopBorder(0)); // returns '┏┓'
 console.log(drawMiddleBorder(8)); // returns '┣━━━━━━━━━┫'
 console.log(drawMiddleBorder(0)); // returns '┣┫'
 console.log(drawBottomBorder(2)); // returns '┗━━┛'
 console.log(drawBarsAround("My name is Dan")); // returns "┃My name is Dan┃"
 console.log(drawBarsAround("You are Jane  ")); // returns "┃You are Jane  ┃"
 console.log(drawBarsAround("  You are Bill")); // returns "┃  You are Bill┃"
 console.log(boxIt(['Jon Snow', 'Cersei Lannister']));
 console.log(boxIt(['Jon Snow']));
 $ node boxit.js 'Jon Snow' 'Cersei Lannister' 'Daenerys Targaryen' 
 */


///////////////////////////////////////////////////////////////////////////////////
//
//  Another more efficiency solution without using function
//
///////////////////////////////////////////////////////////////////////////////////

 /* 
 if(process.argv.length==2){
     console.log("\u250C"+"\u2510");
     console.log("\u2514"+"\u2518");
 }else{
    let max_length=0;
    for(let i=2;i<process.argv.length;i++){         
        if(process.argv[i].length>max_length){
            max_length=process.argv[i].length;
        }
    }   
    console.log("\u250C"+'\u2500'.repeat(max_length)+"\u2510"); 
    for(i=2;i<process.argv.length;i++){
        console.log("\u2502"+process.argv[i]+' '.repeat(max_length-process.argv[i].length)+"\u2502");    
        if(i==process.argv.length-1){
            console.log("\u2514"+'\u2500'.repeat(max_length)+"\u2518");
        }else{
            console.log("\u251C"+'\u2500'.repeat(max_length)+"\u2524");
        }
    }
 }
 */

///////////////////////////////////////////////////////////////////////////////////
//
//  Stretch (Optional)
//  Too easy? Got bored? Try these. Stretches in the homework or exercises often 
//  require knowledge not taught during the class and many may require some research.
//  Add support to use it as a script without prefixing the filename with node. 
//  $ ./boxit.js 'Jon Snow' 'Cersei Lannister' 'Daenerys Targaryen'
//
///////////////////////////////////////////////////////////////////////////////////

/* how to run js without type node?
just need two steps
1. include node file, add following code in the first line of .js
     #!/usr/bin/env node
2. make js first be executable. run the following code in terminal
     chmod +x boxit.js
*/


///////////////////////////////////////////////////////////////////////////////////
//
//  Still bored? Want to try something significantly harder?
//  Add support to read CSV files and output the results as follows:
//  For a file named characters.csv containing the following text ...
//  Names,House
//  Jon Snow,Stark
//  Daenerys Targaryen,Targaryen
//
//  The script should output the text below, when called as follows: 
//  `./boxit.js characters.csv`
//
///////////////////////////////////////////////////////////////////////////////////


/*
if(process.argv.length==2){
    console.log("\u250C"+"\u2510");
    console.log("\u2514"+"\u2518");
}else{   
    // Stretch Add support to read CSV files and output the results
    if(process.argv[2].includes(".csv")){
       // console.log(process.argv[2]);
       var fs = require("fs");
       var text = fs.readFileSync(process.argv[2], 'utf-8');
       var textByLine = text.split('\n');
      
       //console.log(textByLine);
       let max_length_0=0; 
       let max_length_1=0;
       let text_without_empty =new Array;
       for(let i=0;i<textByLine.length;i++){ 
           if(textByLine[i]){
                text_without_empty.push(textByLine[i]);
                ar=textByLine[i].split(",");                
                if(ar[0].length>max_length_0){
                    max_length_0=ar[0].length;
                }
                if(ar[1].length>max_length_1){
                    max_length_1=ar[1].length;
                }
            }
       }
       //console.log(text_without_empty);
       //console.log(max_length_0);
       //console.log(max_length_1);

       return_string = "\u250C"+'\u2500'.repeat(max_length_0)+"\u252C"+'\u2500'.repeat(max_length_1)+"\u2510" +"\n";    
       for(let i=0;i<text_without_empty.length;i++){             
            ar=text_without_empty[i].split(",");
            return_string += "\u2502"+ar[0]+' '.repeat(max_length_0-ar[0].length)+"\u2502";
            return_string += ar[1]+' '.repeat(max_length_1-ar[1].length)+"\u2502" +"\n";    
            if(i==text_without_empty.length-1){
                return_string += "\u2514"+'\u2500'.repeat(max_length_0)+'\u2534'+'\u2500'.repeat(max_length_1)+"\u2518" +"\n";
            }else{
                return_string += "\u251C"+'\u2500'.repeat(max_length_0)+"\u253C"+'\u2500'.repeat(max_length_1) +"\u2524" +"\n";
            }            
       }
       console.log(return_string);        

    }else{
        let ar=new Array;
        for(i=2;i<process.argv.length;i++){
            ar.push(process.argv[i]);
        }
        console.log(boxIt(ar));
    }
}*/

///////////////////////////////////////////////////////////////////////////////////
//
//  The End.
//
///////////////////////////////////////////////////////////////////////////////////
