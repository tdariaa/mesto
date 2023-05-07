import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = this._popup.querySelector('.popup__photo');
    this._text = this._popup.querySelector('.popup__text');
  }

  open = (data) => {
    this._photo.src = data.link;
    this._text.textContent = data.name;
    this._photo.alt = data.name;
    super.open();
  }
}
