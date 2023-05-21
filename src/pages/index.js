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

function submitFormPopupProfile(evt) {
  evt.preventDefault();
  api.patchProfileData({ name: popupWithFormProfile.getInputValues().username, about: popupWithFormProfile.getInputValues().about })
    .then(function (value) {
      console.log(value)
      profileUserInfo.setUserInfo(value.name, value.about, value.avatar);
    })
    .catch(function (value) {
      console.log(value + ', нам жаль :(');
    });
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
      })
      .catch(function (value) {
        console.log(value + ', нам жаль :(');
      });

    popupWarning.close();
  });

popupWarning.setEventListeners();

const formValidatorAvatar = new FormValidator(validationConfig, popupFormAvatar);
formValidatorAvatar.enableValidation();

function submitFormPopupAvatar(evt) {
  evt.preventDefault();

  api.patchAvatar(popupWithFormAvatar.getInputValues().avatar)
    .then(function (value) {
      profileUserInfo.setUserInfo(value.name, value.about, value.avatar);
    })
    .catch(function (value) {
      console.log(value + ', нам жаль :(');
    });

  popupWithFormAvatar.close();
  formValidatorAvatar.resetInput();
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
      if (evt.target.classList.contains('elements__like-button_active')) {
        console.log(evt.target);
        api.deleteLike(cardID)
          .then((value) => {
            console.log(value);
            card._dislikeCard(value);
          })
          .catch(function (value) {
            console.log(value + ', нам жаль :(');
          });
      }
      else {
        api.putLike(cardID)
          .then((value) => {
            console.log(value);
            card._likeCard(value);
          })
          .catch(function (value) {
            console.log(value + ', нам жаль :(');
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
    console.log(value + ', нам жаль :(');
  });

function submitFormPopupCard(evt) {
  evt.preventDefault();

  const newCardData = {
    name: popupWithFormCard.getInputValues().card,
    link: popupWithFormCard.getInputValues().link,
  }

  api.postNewCard(newCardData)
    .then(function (value) {
      console.log(value)
      renderCardList.addItem(createCard(value, value.owner));
    })
    .catch(function (value) {
      console.log(value + ', нам жаль :(');
    });

  popupWithFormCard.close();
}

const formValidatorProfil = new FormValidator(validationConfig, popupFormProfile);
const formValidatorCard = new FormValidator(validationConfig, popupFormCard);
formValidatorProfil.enableValidation();
formValidatorCard.enableValidation();
