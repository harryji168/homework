///////////////////////////////////////////////////////////////////////////////////
//
//  [Homework] Todo CLI – 3Assignment with Stretch
//  Write an interactive CLI todo list application using Node's readline and fs modules. 
//  The following describes what each action does. It would be best to implement 
//  each action as its own function. 
//  Auther: Harry Ji 
//  Date: Sep-18-2021  
//
///////////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
  
console.log('\nWelcome to Todo CLI! \n--------------------');
let todoList =[]; 

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
      return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}
function write_fie(){
    fs.writeFile(fileName, JSON.stringify(todoList), err => {
        if (err) {
            console.log('Could not write to file');
            console.error(err);
            return;
        }
        console.log(`List saved to "${fileName}"`);
        MainMenu();
    });    
}
function MainMenu() {
    rl.question(
      '(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n>',
      response => {
        if (response === 'v') {
            if (todoList.length == 0) {
                console.log('List is empty...');
            }else{    
                for (let todo of todoList) {
                    if (todo.completed) {
                    console.log(`${todoList.indexOf(todo)} [✓] ${todo.title}`);
                    } else {
                    console.log(`${todoList.indexOf(todo)} [ ] ${todo.title}`);
                    }
                }
            }
          MainMenu();
        } else if (response === 'n') {
          rl.question('\nWhat ? \n\n>', newTodo => {
            todoList.push({ completed: false, title: newTodo });
            MainMenu();
          });
        } else if (response[0] === 'c') {
          console.log(`\nCompleted : "${todoList[response[1]].title}"\n`);
          todoList[response[1]].completed = true;
          MainMenu();
        } else if (response[0] === 'd') {
          console.log(`\nDeleted : "${todoList[response[1]].title}"\n`);        
          todoList.splice(response[1],1);
          MainMenu();
        } else if (response === 's') {
            if(process.argv.length>2){
                rl.question('\nWhere?('+process.argv[2]+')\n\n>', path => {
                    if(path.length===0){
                        fileName=process.argv[2];
                    }else{
                        fs.mkdir(path, { recursive: true }, (err) => {
                            if (err) throw err;
                        });
                        fileName=path+'/'+process.argv[2];
                    }
                    setTimeout(write_fie, 100);
                    
                });
            }else{
                rl.question('\nWhere? \n\n>', fileName => {
                    write_fie();
                });
            }
        } else if (response === 'q') {
          console.log('See you soon! 😄');
          rl.close();
        } else {
          console.log('\nError, Enter only the commands in the menu\n');
          MainMenu();
        }
      },
    );
  }


MainMenu();
///////////////////////////////////////////////////////////////////////////////////
//
//  the End 
//
///////////////////////////////////////////////////////////////////////////////////todoList['Fix the climate']=False;