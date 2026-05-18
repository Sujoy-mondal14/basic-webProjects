// 1. Grab all the elements from the HTML
const previousDisplay = document.getElementById('previous');
const currentDisplay = document.getElementById('current');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.op');
const equalsButton = document.querySelector('.equals');

// 2. Set up variables to hold our data (the "State")
let currentOperand = '';  // What the user is currently typing
let previousOperand = ''; // What the user typed before hitting an operator
let operation = undefined; // The math operator (+, -, *, /)

// 3. Core Functions
console.log(currentDisplay);

// Updates what is shown on the screen
function updateDisplay() {
    currentDisplay.innerText = currentOperand;
    
    // If an operation is selected, show the previous number and the operator
    if (operation != null) {
        previousDisplay.innerText = `${previousOperand} ${operation}`;
    } else {
        previousDisplay.innerText = '';
    }
}

// Adds a number to the screen
function appendNumber(number) {
    // Prevent the user from adding more than one decimal point
    if (number === '.' && currentOperand.includes('.')) return;
    
    // Convert to strings so JavaScript appends instead of does math (e.g., '1' + '1' = '11')
    currentOperand = currentOperand.toString() + number.toString();
}

// Sets the operation (+, -, *, /)
function chooseOperation(op) {
    // If there is no current number, do nothing
    if (currentOperand === '') return;
    
    // If there's already a previous number, do the math first (e.g., 5 + 5 + ... computes the first 5+5)
    if (previousOperand !== '') {
        compute();
    }
    
    // Move the current number up to the previous slot, set the operator, and clear the current slot
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

// Does the actual math
function compute() {
    let computation;
    
    // Convert our string variables back into actual numbers
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    // If either number is missing or invalid, stop and do nothing
    if (isNaN(prev) || isNaN(current)) return;
    
    // Check which operation to perform
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    
    // Set the result as the new current operand, and clear the rest
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
}

// 4. Event Listeners (Making the buttons actually do things)

// Attach a click listener to every number button
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText); // Pass the text of the button (e.g., '7')
        updateDisplay();
    });
});

// Attach a click listener to every operation button
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText); // Pass the text of the button (e.g., '+')
        updateDisplay();
    });
});

// Attach a click listener to the equals button
equalsButton.addEventListener('click', () => {
    compute();
    updateDisplay();
});