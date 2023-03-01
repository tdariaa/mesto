let popup = document.querySelector('.popup');
let popupEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');

popupEditButton.addEventListener('click', function (e) {
    e.preventDefault();
    popup.classList.add('openPopup');
});

popupCloseButton.addEventListener('click', () => {
    popup.classList.remove('openPopup');
});


// --------------------------------------------------------------------------------------------------------
let elements = document.querySelector('.elements');

for (let i = 0; i < 6; i++) {
    let likeButton = elements.querySelectorAll('.elements__like-button')[i];
    likeButton.addEventListener('click', function (e) {
        e.preventDefault();
        likeButton.classList.toggle('likeButtonActive');
    });
}








/*
// Находим форму в DOM
let formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = // Воспользуйтесь инструментом .querySelector()
let jobInput = // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

*/