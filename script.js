'use strict'

function executeScript() {
  // Get user details 
  let username = document.getElementById("username").value;
  let userAge = document.getElementById("userAge").value;
  let userWeight = document.getElementById("userWeight").value;
  let dailyRunningKms = document.getElementById("dailyRunningKms").value;
  let dailyWaterIntake =
    document.getElementById("dailyWaterIntake").value;

  // Get selected operator value
  let comparisonOperator =
    document.getElementById("comparisonOperator").value;
  let A = document.getElementById("A").value;
  let B = document.getElementById("B").value;

  // Get selected action value
  let template = document.getElementById("template").value;

  //pack these details into objects
  let userDetails = {
    username,
    userAge,
    userWeight,
    dailyRunningKms,
    dailyWaterIntake,
  }
  let triggerCondition = {
    comparisonOperator,
    A,
    B,
  }
  let action = {
    template,
  };

  //pass the details to ruleEngine
  ruleEngine(userDetails, triggerCondition, action)

  document.getElementById("userForm").reset();
}

function ruleEngine(userDetails, triggerCondition, action) {
  let conditionResult = false;
  let a = triggerCondition.A;
  let b = triggerCondition.B;
  //compute the result of as per selected trigger condition
  switch (triggerCondition.comparisonOperator) {
    case '==':
      conditionResult = a == b;
      break;

    case '<':
      conditionResult = a < b;
      break;

    case '>':
      conditionResult = a > b;
      break;

    case '>=':
      conditionResult = a >= b;
      break;

    case '<=':
      conditionResult = a <= b;
      break;

    case '=s':
      conditionResult = a === b;
      break;

  }

  if (conditionResult) {
    switch (action.template) {
      case 'copy':
        copyValue(userDetails);
        break;
      case 'arithmetic':
        performArithmetic(userDetails);
        break;
      case 'graph':
        drawGraph(userDetails);
        break;
      default:
        console.log('Invalid action template');
    }
  } else {
    alert("Given details does not satisfy the trigger condition.");
  }
}

//Action: Copy value from source variable to destination variable as specified by user
function copyValue(userDetails) {
  //ask for variables names for required copy operation
  let source = prompt("Enter source variable name (in camelcase format)");
  let destination = prompt("Enter destination variable name (in camelcase format)");

  //perform the copy operation
  userDetails[destination] = userDetails[source];

  //print the resulting details
  printUserDetails(userDetails);
}

// Action: Change the current value using arithmetic functions
function performArithmetic(userDetails) {
  let operation = +prompt("Select arithmetic function code from below options (For eg. if you want to perform square operation, then select 2)\n1. Double\n2. Square\n3. Increment");

  if (!isFinite(operation) || operation < 1 || operation > 3) {
    alert("You entered an invalid number");
    return;
  }

  for (let key in userDetails) {
    if (key == 'username') continue;
    userDetails[key] = applyFunction(operation, userDetails[key]);
  }

  //print the resulting details
  printUserDetails(userDetails);
}



function drawGraph(userDetails) {

  // Perform the necessary graph drawing operation
}

//printUserDetails is used to render the resulting details in output screen on new page
function printUserDetails(userDetails) {
  //create an anchor element and pass user details using query parameters
  let anchor = document.createElement("a");
  anchor.href = "output.html?";
  let cnt = 0;
  for (let key in userDetails) {
    if (cnt) anchor.href += "&";
    anchor.href += key + "=" + userDetails[key];
    ++cnt;
  }
  anchor.click();
}

function applyFunction(operation, val) {
  //return resulting value based on the operation
  switch (operation) {
    case 1:
      return 2 * (+val);

    case 2:
      return +val * +val;

    case 3:
      return +val + 1;
  }
}
