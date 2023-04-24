export default class FormValidator {
  constructor(validationConfig, validationFormElement) {
    this._validationConfig = validationConfig;
    this._validationFormElement = validationFormElement;
  };

  enableValidation() {
    this._inputList = Array.from(this._validationFormElement.querySelectorAll(this._validationConfig.inputSelector));
    this._setEventListeners();
  };

  _setEventListeners() {
    this._buttonElement = this._validationFormElement.querySelector(this._validationConfig.submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState()
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.checkValidity()) {
      this._hideError(inputElement);
    }
    else {
      this._showError(inputElement);
    }
  };

  _showError(inputElement) {
    const currentInputErrorContainer = this._validationFormElement.querySelector(`.${inputElement.id}-error`);
    currentInputErrorContainer.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._validationConfig.inputErrorClass);
  }
  _hideError(inputElement) {
    const currentInputErrorContainer = this._validationFormElement.querySelector(`.${inputElement.id}-error`);
    currentInputErrorContainer.textContent = '';
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  _hasInvalidInput() {
    return this._inputList.some(item => !item.validity.valid);
  };
  _enableButton() {
    this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
    this._buttonElement.removeAttribute('disable', true);
    this._buttonElement.disabled = false;
  };
  _disableButton() {
    this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
    this._buttonElement.setAttribute('disable', true);
    this._buttonElement.disabled = true;
  };

  resetInput() {
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
      this._toggleButtonState();
    });
  }
};
