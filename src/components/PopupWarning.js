import Popup from "./Popup.js";

export default class PopupWarning extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmit = formSubmit;
  }
  open = (element) => {
    super.open();
    this._element = element;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._element)
    });
  }
}
