import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._allFormInput = Array.from(this._form.querySelectorAll('.popup__input'));
    this._formValues = {};
    this._allFormInput.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._allFormInput = Array.from(this._form.querySelectorAll('.popup__input'));
    this._allFormInput.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmit);
  }
}
