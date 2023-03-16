const popupProfile = document.querySelector('.popup__profile');
const popupCard = document.querySelector('.popup__card');
const popupPicture = document.querySelector('.popup__picture');

const popupFormContainerProfile = document.querySelector('.popup__container_profile');
const popupFormContainerCard = document.querySelector('.popup__container_card');

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


const popupCloseButtonProfile = document.querySelector('.popup__close_profile');
const popupCloseButtonCard = document.querySelector('.popup__close_card');
const popupCloseButtonPicture = document.querySelector('.popup__close_picture');

const cardTemplate = document.querySelector('#elements').content;
const elements = document.querySelector('.elements');



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

//_______________________________________EDIT PROFILE_____________________________________________

popupEditButton.addEventListener('click', function (e) {
  e.preventDefault();

  popupFormName.value = profileName.textContent;
  popupFormAbout.value = profileAbout.textContent;

  popupProfile.classList.add('popup_open');
  popupFormContainerProfile.classList.add('popup__container_open');

});

popupCloseButtonProfile.addEventListener('click', () => {
  popupProfile.classList.remove('popup_open');
  popupFormContainerProfile.classList.remove('popup__container_open');
});

popupFormProfile.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = popupFormName.value;
  profileAbout.textContent = popupFormAbout.value;

  popupProfile.classList.remove('popup_open');
  popupFormContainerProfile.classList.remove('popup__container_open');
});

//_______________________________________ADD CARDS_____________________________________________


popupAddButton.addEventListener('click', function (e) {
  e.preventDefault();
  popupFormLink.value ='';
  popupFormNameCard.value = '';

  popupCard.classList.add('popup_open');
  popupFormContainerCard.classList.add('popup__container_open');

});

popupCloseButtonCard.addEventListener('click', () => {
  popupCard.classList.remove('popup_open');
  popupFormContainerCard.classList.remove('popup__container_open');
});

function createCard(link, name) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  cardElement.querySelector('.elements__photo').src = link;
  cardElement.querySelector('.elements__name').textContent = name;
  cardElement.querySelector('.elements__photo').alt = name;

  cardElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });

  cardElement.querySelector('.elements__trash').addEventListener('click', function (evt) {
    cardElement.remove();
  });

  cardElement.querySelector('.elements__photo').addEventListener('click', function (evt) {
    popupPicture.classList.add('popup_open');
    document.querySelector('.popup__photo').src = link;
    document.querySelector('.popup__text').textContent = name;
    document.querySelector('.popup__photo').alt = name;
  });

  return cardElement
}

for (let i = 0; i < initialCards.length; i++) {
  elements.append(createCard(initialCards[i].link, initialCards[i].name));
}

popupFormCard.addEventListener('submit', function (e) {
  e.preventDefault();
  elements.prepend(createCard(popupFormLink.value, popupFormNameCard.value));

  popupCard.classList.remove('popup_open');
  popupFormContainerCard.classList.remove('popup__container_open');
});

popupCloseButtonPicture.addEventListener('click', () => {
  popupPicture.classList.remove('popup_open');
  document.querySelector('.popup__photo').src = '';
  document.querySelector('.popup__text').textContent = '';
  document.querySelector('.popup__photo').alt = '';
});
