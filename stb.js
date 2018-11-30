var shutTheBox = function () {

  // vars
  var board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var roll;
  var sum = 0;
  var sumArr = [];
  var result;
  var num;

  // helper functions
  var rollDice = function () {
    return Math.floor(Math.random() * (13 - 2)) + 2;
  };
  var userChoice = function () {
    var resultSplit;
    result = prompt("Your roll:" + roll + " Which tile(s) would you like to flip down?" + "The following tiles are still up: " + board + '. Separate numbers by a space.');
    var checkIfLetters = /[0-9]/.test(result);
    if (!checkIfLetters) {
      alert("You need to enter digits 1 - 9. Please try again.");
      result = prompt("Your roll:" + roll + " Which tile(s) would you like to flip down?" + "The following tiles are still up: " + board + '. Separate numbers by a space.');
    }
    resultSplit = result.split(' ');
    return resultSplit;
  };
  var checkUserChoice = function (enteredNums) {
    sum = 0;
    for (var i = 0; i < enteredNums.length; i++) {
      num = parseInt(enteredNums[i]);
      if (!board.includes(num)) {
        alert("That tile has already been flipped down. Please try again.")
        gameFlow();
      } else {
        sum += num;
        sumArr.push(num);
      }
    }
    if (sum !== roll) {
      alert("The numbers you entered do not add up to the dice roll. Please try again.");
      gameFlow();
    }

    if (sum === roll) {
      sumArr.forEach(function (item) {
        var r = board.indexOf(item);
        board.splice(r, 1);
      });
      sumArr = [];
    }
  }

  var canGameContinue = function () {
    /// start new appraoach

    var possibles = [];
    board.filter(function (item) {
      if (item <= roll) {
        possibles.push(item)
      }
    });

    if (roll < 10) {
      if (possibles[possibles.length - 1] === roll) {
        return true;
      }
    }

    var deRoll = roll - 1;
    var diff = 0;
    var checkPossibles = function (deRoll, diff) {
      diff = roll - deRoll;
      if (possibles.includes(deRoll) && possibles.includes(diff)) {
        return true;
      }
      if (deRoll === 0) {
        return false;
      }
        return checkPossibles(deRoll - 1, diff);

    }

 return checkPossibles(deRoll, diff);

    // for (var i = 0; i < possibles.length; i++) { // roll: 10  // newArr: [1, 2, 4, 5, 7]
    //   var target = roll - possibles[i];
    //   if (possibles.includes(target)) {
    //     return true;
    //   }
    // }
  }


  var gameFlow = function () {
    if (roll === undefined) {
      alert("Click 'OK' to roll dice.")
      roll = rollDice();
    }
    alert("You rolled a " + roll + "!")
    if (canGameContinue() === false) {
      alert("Your roll: " + `"${roll}"` + " Your remaining tiles: " + board + " Sorry, you have failed to shut the box!");
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