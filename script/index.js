import { initialCards } from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');

const popupEditButton = document.querySelector('.profile__edit-button');
const popupFormProfile = document.querySelector('.popup__form_profile');
const popupFormName = popupFormProfile.querySelector('.popup__input_type_name');
const popupFormAbout = popupFormProfile.querySelector('.popup__input_type_about');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const popupAddButton = document.querySelector('.profile__add-button');
const popupFormCard = document.querySelector('.popup__form_card');
const popupFormNameCard = popupFormCard.querySelector('.popup__input_type_name-card');
const popupFormLink = popupFormCard.querySelector('.popup__input_type_link');

const cardTemplate = document.querySelector('#elements').content;
const cardTemplateID = '#elements';
const elementsCard = cardTemplate.querySelector('.elements__card');
const elements = document.querySelector('.elements');
const cardList = document.querySelector('.elements');
const popupCloseButton = document.querySelector('.popup__close_picture');

const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
};

popupEditButton.addEventListener('click', function (e) {
  e.preventDefault();
  popupFormName.value = profileName.textContent;
  popupFormAbout.value = profileAbout.textContent;
  formValidatorProfil.resetInput();
  openPopup(popupProfile);
});

popupFormProfile.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = popupFormName.value;
  profileAbout.textContent = popupFormAbout.value;
  closePopup(popupProfile);
});

popupAddButton.addEventListener('click', function (e) {
  e.preventDefault();
  popupFormCard.reset();
  formValidatorCard.resetInput();
  openPopup(popupCard);
});

// закрытие попапа при нажатии на оверлей или крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});

// закрытие попапа при нажатии на escape
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// отрисовка 6 заданных карточек при загрузке
function createCard(item) {
  const card = new Card(item, cardTemplateID, openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);
  elements.append(cardElement);
});

//  карточки добавляемые пользователем
popupFormCard.addEventListener('submit', function (e) {
  e.preventDefault();
  const newItem = { link: popupFormLink.value, name: popupFormNameCard.value };
  const newCard = new Card(newItem, cardTemplateID, openPopup);
  const newCardElement = newCard.generateCard();
  elements.prepend(newCardElement);
  closePopup(popupCard);
});

const formValidatorProfil = new FormValidator(validationConfig, popupFormProfile);
const formValidatorCard = new FormValidator(validationConfig, popupFormCard);
formValidatorProfil.enableValidation();
formValidatorCard.enableValidation();
