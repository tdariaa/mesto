const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function enableValidation({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

function setEventListeners(formToValidate, { inputSelector, submitButtonSelector, ...rest }) {
  const inputList = Array.from(formToValidate.querySelectorAll(inputSelector));
  const buttonElement = formToValidate.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, rest);
      if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, rest);
      }
      else {
        enableButton(buttonElement, rest);
      }
    });
  });
};

function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

function checkInputValidity(inputElement, {inputErrorClass}) {
  const currentInputErrorContainer = document.querySelector(`.${inputElement.id}-error`);
  if (inputElement.checkValidity()) {
    currentInputErrorContainer.textContent = '';
    inputElement.classList.remove(inputErrorClass);
  }
  else {
    currentInputErrorContainer.textContent = inputElement.validationMessage;
    inputElement.classList.add(inputErrorClass);
  }
};

function hasInvalidInput(formInputs) {
  return formInputs.some(item => !item.validity.valid);
};

function enableButton(button, {inactiveButtonClass}) {
  button.classList.remove(inactiveButtonClass);
  button.setAttribute('disable', true);
};

function disableButton(button, {inactiveButtonClass}) {
  button.classList.add(inactiveButtonClass);
  button.removeAttribute('disable', true);
};

enableValidation(validationConfig);
