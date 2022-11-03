const instruction = document.querySelector('.instruction');
const guessInput = document.querySelector('.guessInput');
const guessButton = document.querySelector('.guessButton');
const guessList = document.querySelector('.guessList');
const inputNaN = document.querySelector('.inputNaN');
const noInput = document.querySelector('.noInput');
const outOfRange = document.querySelector('.outOfRange');
const restartButton = document.querySelector('.restartButton')
const triesCounter = document.querySelector('.tries')
const answer = document.querySelector('.answer')
const returnButton = document.querySelector('.return')
const singleButton = document.querySelector('.singleButton');
const multiButton = document.querySelector('.multiButton');
const aiButton = document.querySelector('.aiButton');
const startScreen = document.querySelector('.startScreen');
const singleplayer = document.querySelector('.singleplayer');
const multiplayer = document.querySelector('.multiplayer');
const againstAI = document.querySelector('.againstAI');

let tries = 0;

function randomNumber() {
    const numberToGuess = Math.ceil(Math.random() * 100);
    return numberToGuess;
}

let randomNr = randomNumber();

console.log(randomNr);

function isNumber() {
    let input = guessInput.value;

    if (isNaN(input) || input.includes(' ')) {
        inputNaN.classList.remove('hidden')
        noInput.classList.add('hidden')
        outOfRange.classList.add('hidden')
        return false;
    } else {
        if (input < 1 && input != '' || input > 100 && input != '') {
            inputNaN.classList.add('hidden')
            noInput.classList.add('hidden')
            outOfRange.classList.remove('hidden')
        } else {
            inputNaN.classList.add('hidden')
            noInput.classList.add('hidden')
            outOfRange.classList.add('hidden')
            return true;
        }
    }
}

guessInput.focus();
guessInput.addEventListener('input', isNumber);

function guess() {
    let input = guessInput.value;

    if (input === '') {
        noInput.classList.remove('hidden')
        inputNaN.classList.add('hidden')
        outOfRange.classList.add('hidden')
    } else if (isNumber()) {
        if (input === randomNr.toString()) {
            instruction.innerHTML = 'CONGRATULATIONS! You guessed right!';
            guessList.insertAdjacentHTML('beforeend', `<li>${input} (correct)</li>`)
            end();
            tries += 10;
            nrOfTries()
        } else if (Number(input) < randomNr) {
            instruction.innerHTML = 'Your guess was too low. Guess again!';
            guessList.insertAdjacentHTML('beforeend', `<li>${input} (too low)</li>`)
            guessInput.value = '';
            nrOfTries()
        } else if (Number(input) > randomNr) {
            instruction.innerHTML = 'Your guess was too high. Guess again!';
            guessList.insertAdjacentHTML('beforeend', `<li>${input} (too high)</li>`)
            guessInput.value = '';
            nrOfTries()
        }
    }

    guessInput.focus()
};

guessButton.addEventListener('click', guess);
guessInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        guess();
    }
});


function end() {
    guessInput.disabled = true;
    restartButton.classList.remove('hidden')
    guessButton.classList.add('hidden')
}

function nrOfTries() {
    tries++
    console.log(tries)
    if (tries === 5) {
        end();
        instruction.innerHTML = 'You are out of tries. Try again';
        answer.innerHTML = `Correct answer: ${randomNr}`
        triesCounter.innerHTML = `Tries: 5 (max: 5)`;
    } else if (tries < 5) {
        triesCounter.innerHTML = `Tries: ${tries} (max: 5)`;
    } else {
        triesCounter.innerHTML = `Tries: ${tries-10} (max: 5)`;
    }
}

function restart() {
    instruction.innerHTML = 'Write a number between 1 and 100 to guess';
    guessList.innerHTML = '';
    guessInput.disabled = false;
    guessInput.value = '';
    restartButton.classList.add('hidden');
    guessButton.classList.remove('hidden');
    triesCounter.innerHTML = `Tries: 0 (max: 5)`;
    answer.innerHTML = ''
    tries = 0;
    randomNr = randomNumber()
    console.log(randomNr);
    guessInput.focus();
};

restartButton.addEventListener('click', restart);

function returnToStart() {
    singleplayer.classList.add('hidden')
    multiplayer.classList.add('hidden')
    againstAI.classList.add('hidden')
    startScreen.classList.remove('hidden')

    restart()
};

returnButton.addEventListener('click', returnToStart);

//start screen
function startSingle() {
    singleplayer.classList.remove('hidden')
    multiplayer.classList.add('hidden')
    againstAI.classList.add('hidden')
    startScreen.classList.add('hidden')
    guessInput.focus();
};

function startMulti() {
    singleplayer.classList.add('hidden')
    multiplayer.classList.remove('hidden')
    againstAI.classList.add('hidden')
    startScreen.classList.add('hidden')
    guessInput.focus();
};

function startAI() {
    singleplayer.classList.add('hidden')
    multiplayer.classList.add('hidden')
    againstAI.classList.remove('hidden')
    startScreen.classList.add('hidden')
    guessInput.focus();
};

singleButton.addEventListener('click', startSingle);
multiButton.addEventListener('click', startMulti);
aiButton.addEventListener('click', startAI);

//kanske modifiera singleplayerboxen istället för att göra helt separata för multi och AI?
//eller läg hela filen, minus start screen, i en function och mata in 0,1 och 2 som parameter för respektive gametype knapptryck
//och dessa hamnar efter queryselector ex..[0], för att välja en viss gametypes classer istälet för någon av de andra.
//fast hur blir det då med skillnaderna mellan deras funktioner? dvs att en ai eller andra spelare tillsatts, då kan man kanske inte dela kod till alla tre?
//aja, på nåt sätt går det nog

//lägg till AI motståndare
//Styla allt med css