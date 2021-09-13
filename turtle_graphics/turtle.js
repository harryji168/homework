///////////////////////////////////////////////////////////////////////////////////
//
//  [Homework] Turtle Graphics - 2
//  Drawing Turtle Graphics Style
//  In this homework, you will create a simple drawing program 
//  inspired by Turtle Graphics. It will be a much simpler implementation 
//  that will only accept right angles (90 degrees).
//  Auther: Harry Ji 
//  Date: Sep-12-2021  
//
///////////////////////////////////////////////////////////////////////////////////

class Turtle {
    constructor (x, y) {
        this.x = Number(x) || 0;
        this.y = Number(y) || 0;
        if(this.x>=5){ 
            this.maxX=this.x;
        }else{
            this.maxX=5;
        }  
        if(this.x<0){ 
            this.minX =this.x;
        }else{
            this.minX=0;
        }  
        if(this.y>5){ 
            this.maxY=this.y;
        }else{
            this.maxY=5;
        }  
        if(this.y<0 ){ 
            this.minY=this.y;
        }else{
            this.minY=0;
        }  
        this.direction = 'x+';        
        this.steps_array = [];
        this.steps_array.push([this.x, this.y]);
    }; 
    print(file_name=''){ 
        const turtleFootprint = (x, y) => {
            for (let step of this.steps_array) {
                if (step[0] === x && step[1] === y)
                return true;
            }
            return false;
        };
        let return_string='';
        
        return_string += '-- BEGIN LOG\n';
        for (let j = this.minY; j <= this.maxY; j++){
            let row = '';
            for (let i = this.minX; i <= this.maxX; i++){  
                if (i === this.x && j === this.y){
                    if (this.direction === 'x+') {
                        row += ' > ';
                    } else if (this.direction === 'y-') {                
                        row += ' ^ ';
                    } else if (this.direction === 'x-') {
                        row += ' < ';
                    } else if (this.direction === 'y+') {
                        row += ' v ';
                    }
                    
                }else{           
                    if (turtleFootprint (i, j)) {   
                        row += ' ■ ';
                    } else {
                        row += ' □ ';
                    }
                }
            
            }
            return_string += row+'\n';
        } 
        return_string += '-- END LOG\n';
        if(file_name ===''){
            console.log(return_string);
        }else{             
            
            fs.writeFile(file_name,return_string , function (err) {
            if (err) return console.log(err);
                 console.log("🐢 Drawing written to "+file_name);
            });
        }
        return this;
    }
    forward (step_para) {
        let step=Number(step_para);
        //console.log('\nPosition:'+this.x+","+this.y+ " Direction:"+this.direction+" Step:"+step);
        for (let i = 0; i < step; i++) {
            if (this.direction === 'x+') {
                this.x++;                
                if(this.x>=this.maxX){ //if turtule step over the board
                    this.maxX++;
                } 
            } else if (this.direction === 'y-') {                
                this.y--;        
                if(this.y<=this.minY){  
                    this.minY--;
                }       
            } else if (this.direction === 'x-') {
                this.x--;
                if(this.x<this.minX){  
                    this.minX--;
                }  
            } else if (this.direction === 'y+') {
                this.y++;
                if(this.y>=this.maxY){  
                    this.maxY++;
                }  
            } else {
                return this;
            }         
            this.steps_array.push([this.x, this.y]);
                   
        }
        return this;
    }
    right () {      
        //console.log('Position:'+this.x+","+this.y+ " Direction:"+this.direction);
        if (this.direction === 'x+') {
            this.direction='y+';
        } else if (this.direction === 'y+') {
            this.direction='x-';
        } else if (this.direction === 'x-') {
            this.direction='y-';
        } else if (this.direction === 'y-') {
            this.direction='x+';
        }   
       // console.log('turn right:'+this.x+","+this.y+ " Direction:"+this.direction);             
        return this;
    };
    left () {   
       // console.log('Position:'+this.x+","+this.y+ " Direction:"+this.direction);   
        if (this.direction === 'x+') {
            this.direction='y-';
        } else if (this.direction === 'y-') {
            this.direction='x-';
        } else if (this.direction === 'x-') {
            this.direction='y+';
        } else if (this.direction === 'y+') {
            this.direction='x+';
        }        
       // console.log('turn left:'+this.x+","+this.y+ " Direction:"+this.direction); 
        return this;
    };
    allPoints(){
        return this.steps_array;
    }    
};

/*
//////////////////////////////////////////////////////////////////////////////////
//
//  Breaking It Down
//  Before beginning, you should read all instructions.
//
//  The Turtle
//  To begin drawing, your program needs to know where it should begin.
//  Create a Turtle class whose constructor will take two arguments 
//  (in order): x & y coordinates. Here are some examples:
//  This turtle begins at position (0, 0) on our fictional 5 by 5 grid. 
//
///////////////////////////////////////////////////////////////////////////////////

new Turtle(0, 0).print();
new Turtle(2, 3).print();
new Turtle(5, 5).print();


///////////////////////////////////////////////////////////////////////////////////
//
//  Moving The Turtle
//  Create a forward method that takes a number of steps then updates the Turtle  
//  instance with its new position after moving that many steps. Keep track of
//  every movement the turtle makes including the first one. 
//
///////////////////////////////////////////////////////////////////////////////////

new Turtle(0, 0).forward(3).print();


///////////////////////////////////////////////////////////////////////////////////
//
//  Turning The Turtle
//  Create a right method that takes zero arguments. When right is called, 
//  update the Turtle instance to rotate its facing to the right. A turtle should 
//  begin facing east.
//
///////////////////////////////////////////////////////////////////////////////////

new Turtle(0, 0).forward(3).right().forward(2).print();


///////////////////////////////////////////////////////////////////////////////////
//
//  Create a left method like right but turns the turtle's facing to the left.
//
///////////////////////////////////////////////////////////////////////////////////

new Turtle(0, 4).forward(3).left().forward(3).print();


///////////////////////////////////////////////////////////////////////////////////
//
//  Create an allPoints method which returns an array containing all coordinates 
//  the turtle has walked over.
//
///////////////////////////////////////////////////////////////////////////////////

console.log(new Turtle(0, 4).forward(3).left().forward(3).allPoints());
const flash = new Turtle(0, 4).forward(3).left().forward(3);
console.log(flash.allPoints());


///////////////////////////////////////////////////////////////////////////////////
//
//  Print
//  Create a print method that draws the path that the turtle walked over as a string
//  and logs it to the console. You should use the array of coordinates returned by 
//  .allPoints() as your starting point. 
//
///////////////////////////////////////////////////////////////////////////////////

new Turtle(0, 4)
.forward(3)
.left()
.forward(3) 
.right()
.forward(5)
.right()
.forward(8)
.right()
.forward(5)
.right()
.forward(3)
.left()
.forward(3)
.print();

///////////////////////////////////////////////////////////////////////////////////
//
//  Stretch
//  Make the turtle graphics program usable as a script. 
//  It should take a string as a an argument that is seperated by dashes 
//  (i.e. ->). This string will contain all turtle commands in abbreviated form:
//  tX,Y for new Turtle where X & Y are numbers representing the starting x & y
//  coordinates. If this command is not given, begin the turtle at (0, 0).
//  fN for forward where N is a number representing how many units the turtle moves forward.
//   r for right
//  l for left
//
///////////////////////////////////////////////////////////////////////////////////

$ node turtle.js t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5
 
$ node turtle.js f10-r-r-f10-l-f5-l-f10-r-f5-r-f11

$ node turtle.js t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5

///////////////////////////////////////////////////////////////////////////////////
//
//  Save To a File  Have your script accept an  --output=[filename<]/code>
//  where [filename] corresponds to the name of a file. 
//  If the option is used, write the turtle drawing to the file using 
//  fs.writeFile. Notify the user of that the write was completed.
//
///////////////////////////////////////////////////////////////////////////////////

$ node turtle.js --output=drawing.txt f10-r-f10-r-f10-r-f10

*/


if(!process.argv[2]){
    new Turtle(0, 0).print();
}else{    
    let file_name='';
    if(process.argv[2].substr(0,9)==="--output="){
        file_name=process.argv[2].substr(9);       
        if(process.argv[3]){
            process.argv[2]=process.argv[3];
        }
    }else if(process.argv[3] && process.argv[3].substr(0,9)==="--output="){
        file_name=process.argv[3].substr(9);
    }

    let run_string='';
    if(process.argv[2].indexOf('t')){
        run_string='flash = new Turtle()';        
    } 
    const arg_array = process.argv[2].split("-");  
    for (let arg of arg_array) {   
        if (arg.substr(0,1)  === 't') {             
            const pos_array = arg.substr(1).split(",");             
            run_string += " flash = new Turtle("+pos_array[0]+","+pos_array[1]+")";                        
        } else if (arg.substr(0,1)  === 'f') {
            run_string +=".forward("+arg.substr(1)+")";
        } else if (arg.substr(0,1)  === 'r') {
            run_string +=".right()";
        } else if (arg.substr(0,1)  === 'l') {
            run_string +=".left()";
        }        

   }
   fs = require('fs');
   
   //console.log(run_string);
   if(file_name===''){
        run_string +=".print(); ";
        eval(run_string);
   }else{
        run_string +=".print('"+file_name+"'); ";  
        eval(run_string);       
   }

}
///////////////////////////////////////////////////////////////////////////////////
//
//  the End 
//
///////////////////////////////////////////////////////////////////////////////////
