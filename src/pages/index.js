import './index.css';
import { initialCards } from '../components/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupSelectorProfile = '.popup_profile';
const popupSelectorCard = '.popup_card';
const popupSelectorPicture = '.popup_picture';
const popupEditButton = document.querySelector('.profile__edit-button');
const popupFormProfile = document.querySelector('.popup__form_profile');
const popupAddButton = document.querySelector('.profile__add-button');
const popupFormCard = document.querySelector('.popup__form_card');
const popupFormNameCard = popupFormCard.querySelector('.popup__input_type_name-card');
const popupFormLink = popupFormCard.querySelector('.popup__input_type_link');
const cardTemplateID = '#elements';
const cardTemplateSelector = '.elements';

const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const profilSelector = {
  nameSelector: '.profile__title',
  aboutSelector: '.profile__subtitle'
};

const popupWithFormProfile = new PopupWithForm(popupSelectorProfile, submitFormPopupProfile);
popupWithFormProfile.setEventListeners();

const popupWithFormCard = new PopupWithForm(popupSelectorCard, submitFormPopupCard);
popupWithFormCard.setEventListeners();

const profileUserInfo = new UserInfo(profilSelector);

function submitFormPopupProfile(evt) {
  evt.preventDefault();
  profileUserInfo.setUserInfo(popupWithFormProfile._getInputValues());
  popupWithFormProfile.close();
};

//  карточки добавляемые пользователем
function submitFormPopupCard(evt) {
  evt.preventDefault();
  const newCardInitial = [{ link: popupFormLink.value, name: popupFormNameCard.value }];
  const renderNewCardList = new Section({
    items: newCardInitial,
    renderer: (item) => {
      const card = new Card(item, cardTemplateID, handleCardClick);
      const cardElement = card.generateCard();
      renderNewCardList.addItem(cardElement);
    }
  }, cardTemplateSelector);
  renderNewCardList.renderItems();
  popupWithFormCard.close();
};

popupEditButton.addEventListener('click', function (e) {
  e.preventDefault();
  formValidatorProfil.resetInput();
  popupWithFormProfile.setInputValues(profileUserInfo.getUserInfo());
  popupWithFormProfile.open();
});

popupAddButton.addEventListener('click', function (e) {
  e.preventDefault();
  popupFormCard.reset();
  formValidatorCard.resetInput();
  popupWithFormCard.open();
});

function handleCardClick(data) {
  const popupPicture = new PopupWithImage(popupSelectorPicture);
  popupPicture.open(data);
};

// отрисовка 6 заданных карточек при загрузке
const renderCardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const card = new Card(item, cardTemplateID, handleCardClick);
    const cardElement = card.generateCard();
    renderCardList.addItem(cardElement);
  }
}, cardTemplateSelector);
renderCardList.renderItems();

// валидация
const formValidatorProfil = new FormValidator(validationConfig, popupFormProfile);
const formValidatorCard = new FormValidator(validationConfig, popupFormCard);
formValidatorProfil.enableValidation();
formValidatorCard.enableValidation();
