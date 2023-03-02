let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__title');
let profileAbout = document.querySelector('.profile__subtitle');

let popupFormSave = document.querySelector('.popup__button');

let popupForm = document.querySelector('.popup__form');
let formElement = popupForm.querySelector('.popup__input');
let popupFormName = popupForm.querySelector('.popup__input_name');
let popupFormAbout = popupForm.querySelector('.popup__input_about');


// __________________POPUP __________________
let popupEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');

popupEditButton.addEventListener('click', function (e) {
    e.preventDefault();
    popup.classList.add('openPopup');
});

popupCloseButton.addEventListener('click', () => {
    popup.classList.remove('openPopup');
    popupFormName.value = profileName.textContent; // когда кликют на крестик - в импут записываются значения из профиля
    popupFormAbout.value = profileAbout.textContent;
});


// __________________LIKE BUTTON __________________
let elements = document.querySelector('.elements');

for (let i = 0; i < 6; i++) {
    let likeButton = elements.querySelectorAll('.elements__like-button')[i];
    likeButton.addEventListener('click', function (e) {
        e.preventDefault();
        likeButton.classList.toggle('elements__like-button_active');
    });
}


// __________________SAVE BUTTON __________________

popupFormSave.addEventListener('click', function (e) {
    e.preventDefault();
    profileName.textContent = popupFormName.value;
    profileAbout.textContent = popupFormAbout.value;


    popup.classList.remove('openPopup');

});


//______________________ Обработчик «отправки» формы ___________________________
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = popupFormName.value;
    profileAbout.textContent = popupFormAbout.value;
}

formElement.addEventListener('submit', popupFormSave);
