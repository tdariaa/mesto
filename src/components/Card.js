export default class CardTwo {
  constructor(data, templateSelector, openPopup, openPopupWarning, profileInfo, handleLike) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardID = data._id;
    this._profileInfo = profileInfo;
    this._cardOwnerID = data.owner._id;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
    this._openPopupWarning = openPopupWarning;
    this._likesLength = data.likes.length;
    this._handleLike = handleLike;
    console.log(this._handleLike);
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
    this._likeButton = this._element.querySelector('.elements__like_button');
    this._likeCounter = this._element.querySelector('.elenents__like_counter');
    this._deleteButton = this._element.querySelector('.elements__trash');

    this._setEventListeners();
    this._removeTrashButton();
    this._cardImage.src = this._link;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._cardImage.alt = this._name;
    this._isCardLiked();
    this._likeCounter.textContent = this._likes.length;
    return this._element;
  }

  _removeTrashButton() {
    if (this._cardOwnerID !== this._profileInfo._id) {
      this._deleteButton.remove();
    }
  }

  _isCardLiked() {
    if (this._likeChecker()) {
      this._likeButton.classList.remove('elements__like_button_active');
    }
    else {
      this._likeButton.classList.add('elements__like_button_active');
    }
  }

  _likeChecker() {
    const checker = arr => arr.every(likes => likes._id !== this._profileInfo._id)
    return checker(this._likes);
  }

  _dislikeCard(data) {
    this._likeButton.classList.remove('elements__like_button_active');
    this._likeCounter.textContent = data.likes.length;
  }

  _likeCard(data) {
    this._likeButton.classList.add('elements__like_button_active');
    this._likeCounter.textContent = data.likes.length;
  }

  _warningPopup() {
    this._openPopupWarning(this);
  }

  removeCard() {
    this._element.remove();
  }

  _openCard() {
    const data = { name: this._name, link: this._link };
    this._openPopup(data);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._openCard();
    });
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLike(this._cardID, evt)
    });
    this._deleteButton.addEventListener('click', () => {
      this._warningPopup();
    });
  }
};
