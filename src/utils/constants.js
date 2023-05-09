const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

export {
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
};
