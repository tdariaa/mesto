const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const popupFormSave = document.querySelector('.popup__button');

const popupFormContainer = document.querySelector('.popup__form_profile');
const formElement = popupFormContainer.querySelector('.popup__input');
const popupFormName = popupFormContainer.querySelector('.popup__input_type_name');
const popupFormAbout = popupFormContainer.querySelector('.popup__input_type_about');



const popupAddButton = document.querySelector('.profile__add-button');
const popupContainer = popup.querySelector('.popup__container_profile');
const popupCard = document.querySelector('.popup__container_card');
const popupCloseButtonCard = document.querySelector('.popup__close_card');

const cardTemplate = document.querySelector('#elements').content;
const elements = document.querySelector('.elements');


const popupFormCard = document.querySelector('.popup__form_card');
const popupFormNameCard = popupFormCard.querySelector('.popup__input_type_name-card');
const popupFormLink = popupFormCard.querySelector('.popup__input_type_link');


// __________________POPUP EDIT BUTTON __________________
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButtonContainer = document.querySelector('.popup__close_container');

popupEditButton.addEventListener('click', function (e) {
  e.preventDefault();

  popupFormName.value = profileName.textContent;
  popupFormAbout.value = profileAbout.textContent;

  popupCard.classList.add('popup__invisible');
  popup.classList.add('popup_open');

});

// __________________POPUP ADD BUTTON __________________

popupAddButton.addEventListener('click', function (e) {
  e.preventDefault();
  popupFormLink.value ='';
  popupFormNameCard.value = '';
  popupContainer.classList.add('popup__invisible');
  popup.classList.add('popup_open');
});


// __________________POPUP CLOSE BUTTON __________________
popupCloseButtonCard.addEventListener('click', () => {
  popup.classList.remove('popup_open');
  popupContainer.classList.remove('popup__invisible');
});
popupCloseButtonContainer.addEventListener('click', () => {
  popup.classList.remove('popup_open');
  popupCard.classList.remove('popup__invisible');
});

// __________________Обработчик «отправки» формы__________________

popupFormContainer.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = popupFormName.value;
  profileAbout.textContent = popupFormAbout.value;


  popup.classList.remove('popup_open');
  popupCard.classList.remove('popup__invisible');
});





// __________________PHOTOCARDS__________________

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


function createCard(link, name) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  cardElement.querySelector('.elements__photo').src = link;
  cardElement.querySelector('.elements__name').textContent = name;

  cardElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
  });

  cardElement.querySelector('.elements__trash').addEventListener('click', function (evt) {
    cardElement.remove();
  });

  return cardElement
}

for (let i = 0; i < initialCards.length; i++) {
  elements.append(createCard(initialCards[i].link, initialCards[i].name));
}

popupFormCard.addEventListener('submit', function (e) {
  e.preventDefault();
  elements.prepend(createCard(popupFormLink.value, popupFormNameCard.value));

  popupContainer.classList.remove('popup__invisible');
  popup.classList.remove('popup_open');
});
