const editProfileButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
const closeButtons = document.querySelectorAll('.popup__close-button');
const elementCard = document.querySelector('.element');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element_template').content;
const popupEdit = document.querySelector('.popup__edit');
const popupForm = document.querySelector('.popup__form');
const profileForm = document.querySelector('.popup__fieldset');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const inputTitle = document.querySelector('.popup__input_type_title');
const inputUrl = document.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup__add');
const addImagePopup = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

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

//открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//закрытие всех popup
//находим все крестики проекта по универсальному селектору
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

//открытие popupEdit
editProfileButton.addEventListener('click', () => {
  openPopup(popupEdit) ;
});

//сохранение popupEdit
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileParagraph.textContent = jobInput.value;
  closePopup(popupEdit);
}
popupEdit.addEventListener('submit', handleProfileFormSubmit);

//добавление 6 карточек, лайк, удаление карточки
function createNewCard({name, link}) {
    const cardElement= elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = cardElement.querySelector('.element__image');
    const cardLikeButton = cardElement.querySelector('.element__like-logo');
    const cardDeleteButton = cardElement.querySelector('.element__trash');
    const elementTitle = cardElement.querySelector('.element__title');


    elementImage.src = link;
    elementImage.alt = `Фотография: ${name}`;
    elementTitle.textContent = name;

    elementImage.addEventListener('click', () => {
      handleCardClick(name, link);
    });

    cardLikeButton.addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like-logo_active');
    });

    cardDeleteButton.addEventListener('click', () => cardElement.remove());

    return cardElement;
  }

  initialCards.forEach(item => elements.prepend(createNewCard(item)));

//открытие addCardPopup
addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup) ;
});

//добавление карточки перед elements
function renderCard(card) {
 elements.prepend(card);
}

//сохранение addCardPopup
function handlePopupFormSubmit(event) {
  event.preventDefault();

  const item = {};
    item['name'] = inputTitle.value;
    item['link'] = inputUrl.value;

  renderCard(createNewCard(item));
 popupForm.reset();
  closePopup(addCardPopup);
}

addCardPopup.addEventListener('submit', handlePopupFormSubmit);

//открытие полноразмерного изображения
function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = `Фотография: ${name}`;
  popupImageTitle.textContent = name;
  openPopup(addImagePopup);
}
