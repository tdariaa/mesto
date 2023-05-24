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
  profileAvatar,
  popupFormNameCard,
  popupFormLink,
  popupSelectorWarning,
  cardTemplateID,
  cardTemplateSelector,
  warningPopup,
  popupFormAvatar,
  popupSelectorAvatar
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWarning from '../components/PopupWarning.js';

const popupWithFormProfile = new PopupWithForm(popupSelectorProfile, submitFormPopupProfile);
popupWithFormProfile.setEventListeners();

const popupWithFormCard = new PopupWithForm(popupSelectorCard, submitFormPopupCard);
popupWithFormCard.setEventListeners();

const profileUserInfo = new UserInfo(profilSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '5ac978e5-969c-4910-b25a-b18a6af9a695',
    'Content-Type': 'application/json'
  }
});

function submitFormPopupProfile(data) {
  return api.patchProfileData({ name: data.username, about: data.about })
    .then(function (value) {
      profileUserInfo.setUserInfo(value.name, value.about, value.avatar);
    })
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

profileAvatar.addEventListener('click', () => {
  formValidatorAvatar.resetInput();
  popupWithFormAvatar.open();
});

const popupPicture = new PopupWithImage(popupSelectorPicture);
popupPicture.setEventListeners();

function handleCardClick(data) {
  popupPicture.open(data);
};

const popupWarning = new PopupWarning(
  popupSelectorWarning,

  (element) => {
    api.deleteCard(element._data._id)
      .then(function (value) {
        element.removeCard();
        popupWarning.close();
      })
      .catch(function (value) {
        console.log('Ошибка:' + value);
      });
  });

popupWarning.setEventListeners();

const formValidatorAvatar = new FormValidator(validationConfig, popupFormAvatar);
formValidatorAvatar.enableValidation();

function submitFormPopupAvatar(data) {
  return api.patchAvatar(data.avatar)
    .then(function (value) {
      profileUserInfo.setUserInfo(value.name, value.about, value.avatar);
    })
};

const popupWithFormAvatar = new PopupWithForm(popupSelectorAvatar, submitFormPopupAvatar);
popupWithFormAvatar.setEventListeners();

function createCard(item, profileInfo) {
  const card = new Card(
    item,
    cardTemplateID,
    handleCardClick,
    popupWarning.open,
    profileInfo,
    function handleLike(cardID, evt) {
      if (evt.target.classList.contains('elements__like_button_active')) {
        api.deleteLike(cardID)
          .then((value) => {
            card.dislikeCard(value);
          })
          .catch(function (value) {
            console.log('Ошибка:' + value);
          });
      }
      else {
        api.putLike(cardID)
          .then((value) => {
            card.likeCard(value);
          })
          .catch(function (value) {
            console.log('Ошибка:' + value);
          });
      }
    }
  );

  const cardElement = card.generateCard();
  return cardElement
}

const renderCardList = new Section(
  (item, profileInfo) => {
    const cardElement = createCard(item, profileInfo);
    renderCardList.addItem(cardElement);
  },
  cardTemplateSelector
);

api.getAllNeededData()
  .then(function (value) {
    const [cardsInfo, profileInfo] = value;
    renderCardList.renderItems(cardsInfo.reverse(), profileInfo);

    profileUserInfo.setUserInfo(profileInfo.name, profileInfo.about, profileInfo.avatar);
  })
  .catch(function (value) {
    console.log('Ошибка:' + value);
  });

function submitFormPopupCard(data) {
  const newCardData = {
    name: data.card,
    link: data.link,
  }
  return api.postNewCard(newCardData)
    .then(function (value) {
      renderCardList.addItem(createCard(value, value.owner));
    })
}

const formValidatorProfil = new FormValidator(validationConfig, popupFormProfile);
const formValidatorCard = new FormValidator(validationConfig, popupFormCard);
formValidatorProfil.enableValidation();
formValidatorCard.enableValidation();
