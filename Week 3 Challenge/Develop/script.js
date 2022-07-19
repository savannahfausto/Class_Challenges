// Assignment Code
var generateBtn = document.querySelector("#generate");

//arrays for different character types user will eventually choose from
var upperCases = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerCases = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numberCases = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var specialChars = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "^", "_", "{", "}", "~"];

//function that first gets parameters for generating password and then generates the password 
function generatePassword() {
  
  //prompt to ask for desired length of password 
  var characterLength = Number(prompt("Please chooose a password length of at least 8 characters and no more than 128 characters."));
  //if click cancel after first prompt, then end function
  if (!characterLength) {
    return;
  }
  //verifying that they choose a number between 8 and 128
  while(characterLength < 8 || characterLength > 128) {
    characterLength = Number(prompt("Please choose a valid number between 8 and 128."));
  }

  //once get characterLength, confirm desired character types for password
  var confirmUpperCase = confirm("Would you like your Password to include Uppercase Letters? \nIf so click OK, if not click cancel.");
  var confirmLowerCase = confirm("Would you like your Password to include Lowercase Letters? \nIf so click OK, if not click cancel.");
  var confirmNumberCase = confirm("Would you like your Password to include Numbers? \nIf so click OK, if not click cancel.");
  var confirmSpecialChar = confirm("Would you like your Password to include Special Characters? \nIf so click OK, if not click cancel.");
  
  //validates at least one character type was chosen
while(!confirmUpperCase && !confirmLowerCase  && !confirmNumberCase && !confirmSpecialChar) {
  var confirmCharacterType = alert("You must confirm 'okay' for at least one of the character types!");
  confirmUpperCase = confirm("Would you like your Password to include Uppercase Letters? \nIf so click OK, if not click cancel.");
  confirmLowerCase = confirm("Would you like your Password to include Lowercase Letters? \nIf so click OK, if not click cancel.");
  confirmNumberCase = confirm("Would you like your Password to include Numbers? \nIf so click OK, if not click cancel.");
  confirmSpecialChar = confirm("Would you like your Password to include Special Characters? \nIf so click OK, if not click cancel.");
}

//this function creates a random password based on the criteria the user chose 
var generatePasswordString = function() {
  //declaring respectively, empty string and empty array that will be filled in with each if statement
  var passwordText = "";
  var possibleChars = [];
  //if user wants upperCase, generate one random uppercase letter
  if (confirmUpperCase) {
    possibleChars = possibleChars.concat(upperCases);
    passwordText += upperCases[Math.floor(Math.random() * upperCases.length)];
  }
  //if user wants lowerCase, generate one random lowercass letter
  if (confirmLowerCase) {
    possibleChars = possibleChars.concat(lowerCases);
    passwordText += lowerCases[Math.floor(Math.random() * lowerCases.length)];
  }
  //if user wants SpecialChar, generate one random special character
  if (confirmSpecialChar) {
    possibleChars = possibleChars.concat(specialChars);
    passwordText += specialChars[Math.floor(Math.random() * specialChars.length)];
  }
  //if user wants numberCase, generate one random number
  if (confirmNumberCase) {
    possibleChars = possibleChars.concat(numberCases);
    passwordText += numberCases[Math.floor(Math.random() * numberCases.length)];
  }
console.log("possibleChars:", possibleChars)
//creates a random password with the length the user specified between 8-128
  for (var i = passwordText.length; i < characterLength; i++) {
      passwordText += possibleChars[Math.floor(Math.random() * possibleChars.length)];
    }
    console.log("passwordText:", passwordText);
    return passwordText;
  } 
  return generatePasswordString();
}



// Writes password generated from generatePassword() to the #password input
function writePassword() {
  //sets the function equal to a variable password
  var password = generatePassword();
  //setst the readonly text area with id password equal to variable passWordText
  var passwordText = document.querySelector("#password");
  //transfers the generated password stored in the password variable to the value of the passwordText so that the password displays on the screen in the readonly textbox
  passwordText.value = password;
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
