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
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
  
console.log('\nWelcome to Todo CLI! \n--------------------');

//let todoList = [{title:'Take out the trash',completed:true},{title:'Take out tBuy toothpastehe trash',completed:true},{title:'Buy Snickerdoodles',completed:false},{title:'Fix the climate',completed:false},{title:'Find a cure for aging',completed:false}];
let todoList =[]; 
//console.log(todoList);
function MainMenu() {
    rl.question(
      '(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>',
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
///////////////////////////////////////////////////////////////////////////////////
