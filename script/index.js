const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');

const popupFormSave = document.querySelector('.popup__button');

const popupForm = document.querySelector('.popup__form');
const formElement = popupForm.querySelector('.popup__input');
const popupFormName = popupForm.querySelector('.popup__input_name');
const popupFormAbout = popupForm.querySelector('.popup__input_about');


// __________________POPUP __________________
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

popupEditButton.addEventListener('click', function (e) {
  e.preventDefault();

  popupFormName.value = profileName.textContent;
  popupFormAbout.value = profileAbout.textContent;

  popup.classList.add('openPopup');
});

popupCloseButton.addEventListener('click', () => {
  popup.classList.remove('openPopup');
});

// __________________Обработчик «отправки» формы__________________

popupForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = popupFormName.value;
  profileAbout.textContent = popupFormAbout.value;


  popup.classList.remove('openPopup');

});
