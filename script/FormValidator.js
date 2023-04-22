export default class FormValidator {
  constructor(validationConfig, validationFormElement) {
    this._validationConfig = validationConfig;
    this._validationFormElement = validationFormElement;
  };

  enableValidation() {
    const inputList = Array.from(this._validationFormElement.querySelectorAll(this._validationConfig.inputSelector));
    this._setEventListeners(inputList);
  };

  _setEventListeners(inputList) {
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList)
      });
    });
  }

  _checkInputValidity(inputElement) {
    const currentInputErrorContainer = this._validationFormElement.querySelector(`.${inputElement.id}-error`);
    if (inputElement.checkValidity()) {
      currentInputErrorContainer.textContent = '';
      inputElement.classList.remove(this._validationConfig.inputErrorClass);
    }
    else {
      currentInputErrorContainer.textContent = inputElement.validationMessage;
      inputElement.classList.add(this._validationConfig.inputErrorClass);
    }
  };

  _toggleButtonState(inputList) {
    const buttonElement = this._validationFormElement.querySelector(this._validationConfig.submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  };

  _hasInvalidInput(formInputs) {
    return formInputs.some(item => !item.validity.valid);
  };
  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disable', true);
  };
  _disableButton(buttonElement) {
    buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disable', true);
  };

  resetInput() {
    const inputList = Array.from(this._validationFormElement.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = this._validationFormElement.querySelector(this._validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
      const currentInputErrorContainer = this._validationFormElement.querySelector(`.${inputElement.id}-error`);
      currentInputErrorContainer.textContent = '';
      inputElement.classList.remove(this._validationConfig.inputErrorClass);
      if (this._hasInvalidInput(inputList)) {
        this._disableButton(buttonElement);
      } else {
        this._enableButton(buttonElement);
      }
    });
  }
};
