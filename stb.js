var shutTheBox = function() {
  // steps of game
    // 1. see arr with nums/tiles left
        // console.log(arr)
    // 2. roll dice
      // helper function genereates random num
    // 3. enter nums/tiles to remove from board arr
      // check if num(s) enter by user add up to random num && those tiles/nums are still in arr
       // if yes, then remove those nums from arr and roll dice again
      // else if - give user chance to enter nums again
      // else game over


  // vars
    var board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var roll;
    var sum = 0;
    var sumArr = [];
    var result;
    var resultSplit;
    var num;

    // helper functions
    var rollDice = function() {
        return Math.floor(Math.random() * (13 - 2)) + 2;
    };
    var userChoice = function () {
        result = prompt("Your roll:" + roll + " Which tile(s) would you like to flip down?" + "The following tiles are still up: " + board + '. Separate numbers by a space.');
        var checkIfLetters = /[0-9]/.test(result);
        if (!checkIfLetters) {
          alert("You need to enter digits 1 - 9. Please try again.");
          result = prompt("Your roll:" + roll + " Which tile(s) would you like to flip down?" + "The following tiles are still up: " + board + '. Separate numbers by a space.');
        }
        resultSplit = result.split(' ');
        return resultSplit;
    };
    var checkUserChoice = function(enteredNums) {
      sum = 0;
      for (var i = 0; i < enteredNums.length; i++) {
            num = parseInt(enteredNums[i]);
            if (!board.includes(num)) {
            alert("That tile has already been flipped down. Please try again.")
            gameFlow();
          } else {
            sum+= num;
            sumArr.push(num);
          }
      }
      if (sum !== roll) {
            alert("The numbers you entered do not add up to the dice roll. Please try again.");
            gameFlow();
          }

      if (sum === roll) {
          sumArr.forEach(function(item) {
            var r = board.indexOf(item);
            board.splice(r, 1);
          });
          sumArr = [];
      }
   }

 var canGameContinue = function() {
      var doEnteredNumsMatchRoll;
        var die1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var die2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var die3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var die4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var pairs = [];
        for (var i = 0; i < die1.length; i++) {
          for (var j = 0; j < die2.length; j++) {
            for (var l = 0; l < die3.length; l++) {
              for (var m = 0; m < die4.length; m++) {
                var fourDie = die1[i] + die2[j] + die3[l] + die4[m];
                  if (fourDie === roll) {
                    pairs.push([die1[i], die2[j], die3[l], die4[m]]);
                }
              }
            }
          }
        }
        for (var k = 0; k < pairs.length; k++) {
          if (pairs[k][0] === 0) {
            pairs[k][0] = board[0];
          }
          if (pairs[k][1] === 0) {
            pairs[k][1] = board[0];
          }
          if (pairs[k][2] === 0) {
            pairs[k][2] = board[0];
          }
          if (pairs[k][3] === 0) {
            pairs[k][3] = board[0];
          }

          if (board.includes(pairs[k][0]) && board.includes(pairs[k][1])) {
            if (board.includes(pairs[k][2]) && board.includes(pairs[k][3])) {
              doEnteredNumsMatchRoll = true;
              break;
            }
          } else {
            doEnteredNumsMatchRoll = false;
          }
        }
        return doEnteredNumsMatchRoll;
   }


   var gameFlow = function () {
      if (roll === undefined) {
        alert("Click 'OK' to roll dice.")
        roll = rollDice();
      }
        alert("You rolled a " + roll + "!")
        if (canGameContinue() === false) {
         alert("Your roll: "+ `"${roll}"` + " Your remaining tiles: " + board + " Sorry, you have failed to shut the box!");
         var answer = prompt("Would you like to play again?")
         if (answer === 'y' || answer === 'yes') {
           board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
           roll = undefined;
           return shutTheBox();
         } else {
           alert("Thanks for playing!")
         }
        }

      var enteredNums = userChoice();
      checkUserChoice(enteredNums);
      if (board.length > 0) {
        roll = undefined;
        return gameFlow();
      } else {
        prompt("You have SHUT... THE... BOX! Congratulations!")
      }
    }

    gameFlow();
}