const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const popupFormSave = document.querySelector('.popup__button');

const popupForm = document.querySelector('.popup__container');
const formElement = popupForm.querySelector('.popup__input');
const popupFormName = popupForm.querySelector('.popup__input_type_name');
const popupFormAbout = popupForm.querySelector('.popup__input_type_about');


// __________________POPUP __________________
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

popupEditButton.addEventListener('click', function (e) {
  e.preventDefault();

  popupFormName.value = profileName.textContent;
  popupFormAbout.value = profileAbout.textContent;

  popup.classList.add('popup_open');
});

popupCloseButton.addEventListener('click', () => {
  popup.classList.remove('popup_open');
});

// __________________Обработчик «отправки» формы__________________

popupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = popupFormName.value;
  profileAbout.textContent = popupFormAbout.value;


  popup.classList.remove('popup_open');

});
