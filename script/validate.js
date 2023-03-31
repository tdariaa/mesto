const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
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
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement);
      if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, rest);
      }
      else {
        enableButton(buttonElement, rest);
      }

    });
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.classList.remove('button_inactive');
  }
};

function checkInputValidity(input) {
  const currentInputErrorContainer = document.querySelector(`.${input.id}-error`);
  if (input.checkValidity()) {
    currentInputErrorContainer.textContent = '';
  }
  else {
    currentInputErrorContainer.textContent = input.validationMessage;
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
