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
    this._cardImage = this._element.querySelector('.elements__photo');
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__trash');

    this._setEventListeners();
    this._cardImage.src = this._link;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._cardImage.alt = this._name;
    return this._element;
  }

  _likeCard() {
    this._likeButton.classList.toggle('elements__like-button_active');
  }
  _removeCard() {
    this._element.remove();
  }
  _openCard() {
    const data = {name: this._name, link: this._link};
    this._openPopup(data);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._openCard();
    });
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });
    this._deleteButton.addEventListener('click', () => {
      this._removeCard();
    });
  }
};
