// 1.0 - gameWords variable
// First, you'll want to keep track of your list of words. To do that, 
// create an array named gameWords. It should have at least 5 elements, have all lowercase strings, and none of those strings should have spaces. You can choose whatever words and theme you like!
// This is the array of words you're going to use for your game from here on out.

var gameWords=["callofduty", "streetfighter","godofwar","madden","fifa"];
    console.log(gameWords);

// Create a function named randomWord. It should take a single argument, an array of words, and should return a random word from that array.   

function randomWord (gameWords){
    var random = Math.floor(Math.random() * gameWords.length);
    return gameWords[random]
}

// Next, you're going to need to have some way to check if a guessed letter is "correct". That is, if the guessed letter is in the current word.
// Write a function named isCorrectGuess that takes two arguments, a word and a letter (in that order). This function should return true if the letter is in the word, and false otherwise.

function isCorrectGuess(word,letter){
    for (i = 0; i < word.length; i++){

    // "i" holds the value of the array
        if (word [i]===letter){
        return true
        }
    }
        return false
}

// You're going to need some code to generate "blanks" ("_" characters) based on the length of the word.
// To do this, create a function named getBlanks that takes one parameter: the word. It should return an array of "_" (underscore) characters with length equal to the length of the word.

function getBlanks(word){
    var underscore = [];
    for (i = 0; i < word.length; i++){
        underscore.push('_')
    }
    return underscore
}

// // The final "utility" you'll need is one which will fill a blanks array in the correct locations given a letter and the word that array was built from.

function fillBlanks(letters, videoGames, array){
    for (var p =0; p < videoGames.length; p++){
        if (videoGames[p]=== letters){
            array[p]= letters
        }
    }
}
// Name your function fillBlanks, and have it take three arguments: the word string, the array of the current puzzle state, and the letter that is going to be filled in (arguments in that order).
// If letter is in randomWord change array position to letter
function fillBlanks(word,array,letter) {
    for (var i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            array[i] = letter
        }
    }  
    return array    
};

// To start the game logic, you're going to need a way to track all of the information associated with an individual "round" of the game.
// Create function named setupRound which will be used to create the "round" object. It should take a single argument: the word.
// The function should return an object with the following properties and values: 1.word 2 guessesLeft 3.wrongGuesses 4.puzzleState √
// word - set to the word passed in as an argument √
// guessesLeft - set to 9 to start √
// wrongGuesses - an empty array to start (since there haven't been any guesses yet) √
// puzzleState - array of blanks representation of word to start. You can update this  later when someone makes a correct guess. √

function setupRound(word) {
    var rounds = {
        word:word,
        guessesLeft: 9,
        wrongGuesses:[],
        puzzleState: getBlanks(word),
    }
    return rounds
 }
//  Now that you can create rounds, you want to be able to update that round every time the user guesses a letter.
//  Write a function named updateRound that takes two arguments: the round object and the string letter guessed.
//  This function should, based on the letter guessed, update all relevant aspects of the round object passed as an argument.

function updateRound(rounds, letter) {
    if (isCorrectGuess(rounds.word, letter) === false) {
        rounds.guessesLeft--; //minus1
        rounds.wrongGuesses.push(letter);
    }
    else {
        fillBlanks(rounds.word, rounds.puzzleState, letter)
    }
    return rounds
}
// To know when you need to start a new round, you're going to need to check if the game has been won or lost. Let's start with checking if the round has been won.
// For this, use a function named hasWon, that takes the array puzzleState as the only argument.
// How can you tell if the round has been won with this information?
// The function should return true if the round is won, false otherwise.

function hasWon(puzzleState) {
    for (var i = 0; i < puzzleState.length; i++){
    if (puzzleState[i] === "_") {
        return false
     } 
    }
    return true
}
// Next, use a function named hasLost to check if the round is lost. This function should take as the only argument the number guessesLeft.
// How can you tell if the round has been lost with this information?
// This function should return true if the round is lost, false otherwise.

function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true;
    }
    return false;
}
// Finally, to allow us to know if you need to start a new round, create a function to check if the round is over. Name it isEndOfRound. It should take the round object as an argument, and return true if the round is over, and false otherwise.
// You'll want to use this function later to trigger starting a new round.
function isEndOfRound(rounds){
    if (rounds.guessesLeft === 0){
        return true
    }
    if (hasWon(rounds.puzzleState)){
        return true
    }
    return false
}
// To track higher-level information like number of wins and losses, you'll need a new object: the game object. The game is the high-level overall object, where the round is the information associated with guessing around a specific word.
// To build and return this game object, create a function named setupGame. It should take three arguments, in this order: the array of words for the game, the number of wins, and the number of losses.
// The function should return an object with the following properties and values:
// words - the array of words passed as an argument
// wins - the number of wins passed as an argument
// losses - the number of losses passed as an argument
// round - a new round object created with a random word from words

function setupGame(gameWords, wins, losses) {
    var hangman = {
        words : gameWords,
        wins : wins,
        losses : losses,
        round : setupRound(randomWord(gameWords)),
    }
    return hangman;
}
// Now that you can check if you should start a new round, you need to create a function to start a new round on the game. To do this, create a function named startNewRound that takes a single argument: the game object. This function is going to update the round on the game object. It should:
// Check to see if the user has won or lost, and update the number of wins and/or losses on the game accordingly.
// Trigger a single alert that informs the user if they've won or lost, and what the word was (the alert just needs to contain the word somewhere).
// For example: "You lost! The word was 'heart'. Try again! ❤️"
// Finally, it should update the game object to have a new round with a new random word.
function startNewRound(game) {
    var puzzleState = game.round.puzzleState;
    var roundWord = game.round.word;
    if (hasWon(puzzleState) === true) {
       game.wins++; 
       {
       alert("WINNER WINNER CHICKEN DINNER! The word is " + roundWord + ". Can you do it again?");
       }
    }
    else {
        game.losses++;
       {
        alert("HAHA YOU LOST! The word was " + roundWord + ". Try again!");
       }
   }
    return game;
}
// Last but not least, you'll want to create the game so you can update it later when the user interacts with the page.
// Create a variable myGame at the global scope equal to the game object, with the same properties as defined above in the setupGame function section.
var myGame = setupGame(gameWords,0,0);
