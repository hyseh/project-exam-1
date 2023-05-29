import { hideLoader } from './components/loader.js';
import { lengthChecker, regexValidator } from './utilities/validation.js';

window.addEventListener('load', () => {
  hideLoader();
});

const commonEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

const form = document.querySelector('#contact-form');
const fullName = document.querySelector('#full-name');
const errorName = document.querySelector('#name-error');
const email = document.querySelector('#email');
const errorEmail = document.querySelector('#email-error');
const subject = document.querySelector('#subject');
const errorSubject = document.querySelector('#subject-error');
const message = document.querySelector('#message');
const errorMessage = document.querySelector('#message-error');
const successMessage = document.querySelector('.form-success');

let nameCheck = false;
let emailCheck = false;
let subjectCheck = false;
let messageCheck = false;

const validateForm = () => {
  if (lengthChecker(fullName.value, 5)) {
    errorName.style.display = 'none';
    nameCheck = true;
  } else {
    errorName.style.display = 'block';
    nameCheck = false;
  }

  if (regexValidator(email.value, commonEmail) === true) {
    errorEmail.style.display = 'none';
    emailCheck = true;
  } else {
    errorEmail.style.display = 'block';
    emailCheck = false;
  }

  if (lengthChecker(subject.value, 15)) {
    errorSubject.style.display = 'none';
    subjectCheck = true;
  } else {
    errorSubject.style.display = 'block';
    subjectCheck = false;
  }

  if (lengthChecker(message.value, 25)) {
    errorMessage.style.display = 'none';
    messageCheck = true;
  } else {
    errorMessage.style.display = 'block';
    messageCheck = false;
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateForm();

  console.log(nameCheck, emailCheck, subjectCheck, messageCheck);

  if (
    nameCheck === true &&
    emailCheck === true &&
    subjectCheck === true &&
    messageCheck === true
  ) {
    successMessage.style.display = 'block';
  } else {
    successMessage.style.display = 'none';
  }
});
