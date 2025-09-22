document.getElementById('registerForm').onsubmit = function(e) {
e.preventDefault();
let valid = true;

// Name validation: not empty, at least 3 characters
const name = document.getElementById('name').value.trim();
console.log(name)
if (name.length < 3) {
  document.getElementById('nameError').textContent = "Name must be at least 3 characters.";
  valid = false;
  } else {
    console.log('test')
  document.getElementById('nameError').textContent = "";
  }

// Email validation: not empty, must contain '@' and '.'
const email = document.getElementById('email').value.trim();
if (email === "" || email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.indexOf('@') > email.lastIndexOf('.')) {
  document.getElementById('emailError').textContent = "Enter a valid email address.";
  valid = false;
  } else {
document.getElementById('emailError').textContent = "";
  }

// Password validation: not empty, at least 6 characters, must contain a number
const password = document.getElementById('password').value;
let hasNumber = false;
for (let i = 0; i < password.length; i++) {
  if (!isNaN(password[i]) && password[i] !== " ") {
    hasNumber = true;
    break;
  }
}
  if (password.length < 6) {
    document.getElementById('passwordError').textContent = "Password must be at least 6 characters.";
    valid = false;
  } else if (!hasNumber) {
    document.getElementById('passwordError').textContent = "Password must contain at least one number.";
    valid = false;
  } else {
    document.getElementById('passwordError').textContent = "";
  }

// Age validation: not empty, must be a number between 10 and 100
const age = document.getElementById('age').value;
if (age === "" || isNaN(age) || Number(age) < 10 || Number(age) > 100) {
  document.getElementById('ageError').textContent = "Age must be between 10 and 100.";
  valid = false;
  } else {
    document.getElementById('ageError').textContent = "";
  }

// Gender validation: must be selected
const genderMale = document.getElementById('male').checked;
const genderFemale = document.getElementById('female').checked;
if (!genderMale && !genderFemale) {
  document.getElementById('genderError').textContent = "Please select your gender.";
  valid = false;
  } else {
    document.getElementById('genderError').textContent = "";
  }

if (valid) {
  alert("Registration successful!");
  document.getElementById('registerForm').reset();
}
};