import './index.css';
import {
  initialCards,
  validationConfig,
  profilSelector,
  popupSelectorProfile,
  popupSelectorCard,
  popupSelectorPicture,
  popupEditButton,
  popupFormProfile,
  popupAddButton,
  popupFormCard,
  popupFormNameCard,
  popupFormLink,
  cardTemplateID,
  cardTemplateSelector
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupWithFormProfile = new PopupWithForm(popupSelectorProfile, submitFormPopupProfile);
popupWithFormProfile.setEventListeners();

const popupWithFormCard = new PopupWithForm(popupSelectorCard, submitFormPopupCard);
popupWithFormCard.setEventListeners();

const profileUserInfo = new UserInfo(profilSelector);

function submitFormPopupProfile(evt) {
  evt.preventDefault();
  profileUserInfo.setUserInfo(popupWithFormProfile.getInputValues());
  popupWithFormProfile.close();
};

popupEditButton.addEventListener('click', function (e) {
  e.preventDefault();
  formValidatorProfil.resetInput();
  popupWithFormProfile.setInputValues(profileUserInfo.getUserInfo());
  popupWithFormProfile.open();
});

popupAddButton.addEventListener('click', function (e) {
  e.preventDefault();
  formValidatorCard.resetInput();
  popupWithFormCard.open();
});

const popupPicture = new PopupWithImage(popupSelectorPicture);
popupPicture.setEventListeners();

function handleCardClick(data) {
  popupPicture.open(data);
};

function createCard(item) {
  const card = new Card(item, cardTemplateID, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

// отрисовка 6 заданных карточек при загрузке
const renderCardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const cardElement = createCard(item);
    renderCardList.addItem(cardElement);
  }
}, cardTemplateSelector);
renderCardList.renderItems();

//  карточки добавляемые пользователем
function submitFormPopupCard(evt) {
  evt.preventDefault();
  const newCardInitial = { link: popupWithFormCard.getInputValues().link, name: popupWithFormCard.getInputValues().card };
  const newCard = createCard(newCardInitial);
  renderCardList.addItem(newCard);
  popupWithFormCard.close();
}

// валидация
const formValidatorProfil = new FormValidator(validationConfig, popupFormProfile);
const formValidatorCard = new FormValidator(validationConfig, popupFormCard);
formValidatorProfil.enableValidation();
formValidatorCard.enableValidation();
