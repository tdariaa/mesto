export default class Card {
  constructor(data, templateSelector, openPopup) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.elements__card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__photo').src = this._link;
    this._element.querySelector('.elements__name').textContent = this._name;
    return this._element;
  }

  _likeCard() {
    this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
  }
  _removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.elements__photo').addEventListener('click', () => {
      this._openPopup(document.querySelector('.popup_picture'));
      document.querySelector('.popup__photo').src = this._link;
      document.querySelector('.popup__text').textContent = this._name;
      document.querySelector('.popup__photo').alt = this._name;
    });
    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this._likeCard();
    });
    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._removeCard();
    });
  }
};
