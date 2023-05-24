import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmit = formSubmit;
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._formSubmit(this.getInputValues())
        .then(() => this.close())
        .catch(function (value) {
          console.log('Ошибка:' + value);
        })
        .finally(() => {
          this._submitButton.textContent = initialText;
        })
    });
  }
}
