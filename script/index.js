const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupPicture = document.querySelector('.popup_picture');
const popupPhoto = popupPicture.querySelector('.popup__photo');
const popupText = popupPicture.querySelector('.popup__text');

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
const elementsCard = cardTemplate.querySelector('.elements__card');
const elements = document.querySelector('.elements');

//_______________________________________EDIT PROFILE_____________________________________________
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
  resetSpan(validationConfig);
  resetInputTypeError(validationConfig);
  openPopup(popupProfile);
  checkButton(validationConfig);
});


popupFormProfile.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = popupFormName.value;
  profileAbout.textContent = popupFormAbout.value;
  closePopup(popupProfile);
});

//_______________________________________ADD CARDS_____________________________________________

popupAddButton.addEventListener('click', function (e) {
  e.preventDefault();
  popupFormCard.reset();
  resetSpan(validationConfig);
  resetInputTypeError(validationConfig);
  openPopup(popupCard);
  checkButton(validationConfig);
});

function createCard(link, name) {
  const cardElement = elementsCard.cloneNode(true);
  const elementsPhoto = cardElement.querySelector('.elements__photo');

  elementsPhoto.src = link;
  cardElement.querySelector('.elements__name').textContent = name;
  elementsPhoto.alt = name;

  cardElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });

  cardElement.querySelector('.elements__trash').addEventListener('click', function (evt) {
    cardElement.remove();
  });

  elementsPhoto.addEventListener('click', function (evt) {
    openPopup(popupPicture);
    popupPhoto.src = link;
    popupText.textContent = name;
    popupPhoto.alt = name;
  });

  return cardElement
}

for (let i = 0; i < initialCards.length; i++) {
  elements.append(createCard(initialCards[i].link, initialCards[i].name));
}

popupFormCard.addEventListener('submit', function (e) {
  e.preventDefault();
  elements.prepend(createCard(popupFormLink.value, popupFormNameCard.value));
  closePopup(popupCard);
});

//________________________________________________CLOSE POPUP BY CLICK ON OVERLAY__________________
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

//________________________________________________CLOSE POPUP BY CLICK ON ESC__________________
function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};
