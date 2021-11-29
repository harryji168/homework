$(document).ready(() => {
     var words = [
      "gaming",
      "codecore",
      "hangman"     
    ];
    let errorCount = 0;
    let guessArray = [];
    let finalArray = [];
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    let word = selectedWord.split("");
  
    function makeKeyboard() {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    alphabet.split('').forEach(letter => {
      $('.keyboard').append(`<span class="key">${letter}</span>`);
    });
    }
    function selectWord() {
      selectedWord = words[Math.floor(Math.random() * words.length)];
      word = selectedWord.split("");
  
      finalArray = [];
      guessArray = [];
      errorCount = 0;
   
      for (let i = 0; i < word.length; i++) {
        finalArray.push("_");
      } 
      $(".empty-word").replaceWith(
        `<div class="empty-word"><h1>${finalArray.join(" ")}</h1></div>`
      );
      $(".key").removeClass("highlight");
      refreshImage();
    }
  
    function refreshImage() {
      $("#hang-image").attr("src", `./images/gallows-0${errorCount}.jpg`);       
    }
    makeKeyboard();  
    selectWord();
  
    let deathSound = new Audio( );
    let victory = new Audio(
    );
  
    function checkWord() {
      for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < guessArray.length; j++) {
          if (word[i] == guessArray[j]) {
            finalArray[i] = word[i];
          }
        }
      }
      $(".empty-word").replaceWith(
        `<div class="empty-word"><h1>${finalArray.join(" ")}</h1></div>`
      );
    }
  
    function mainCallback(char) {
      if (errorCount > 5) {
        deathSound.play();
        setTimeout(function() {
          if (confirm("Better luck next time ...! Do you want to play again?")) {
            selectWord();
          } else {
          }
        }, 200);
        return;
      } else if (word.join("") == finalArray.join("")) {
        setTimeout(function() {
          if (confirm("Congratulations! You Win! Do you want to play again?")) {
            selectWord();
          } else {
          }
        }, 200);
        return;
      } else { 
        if (guessArray.includes(char)) {
          return;
        } 
        guessArray.push(char);
        if (word.includes(char)) {          
          checkWord();
        } else { 
          errorCount++;
          console.log(`Error Count: ${errorCount}`);
        }
  
        console.log(word);
        console.log(finalArray);
  
        refreshImage();
  
        if (word.join("") == finalArray.join("")) {
          victory.play();
          setTimeout(function() {
            if (confirm("You Win!")) {
              selectWord();
            } else {
            }
          }, 200);
          return;
        }
  
        if (errorCount > 5) {
          deathSound.play();
          setTimeout(function() {
            if (
              confirm(
                "Better luck next time ... Do you want to try again?"
              )
            ) {
              selectWord();
            } else {
            }
          }, 200);
          return;
        }
      }
    }
  
    $(".key").on("click", function(event) {
      $(this).addClass("highlight");
      let character = event.target.innerHTML.toLocaleLowerCase();
      mainCallback(character);
    });
  
    //Stretch #2 - Take keyboard inputs
    document.addEventListener("keydown", event => {
      const { key } = event;
      console.log("key:", key);
      capitalKey = key.toUpperCase();
      $(`span:contains(${capitalKey})`).addClass("highlight");
      mainCallback(key);
    });
  });