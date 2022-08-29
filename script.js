const editProfileButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
const elementCard = document.querySelector('.element');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element_template').content;
const closeButton = document.querySelectorAll('.popup__close-button');
const popup = document.querySelector('.popup');
const popupOpened = document.querySelector('.popup_opened');
const popupEdit = document.querySelector('.popup__edit');
const formElement = document.querySelector('.popup__fieldset');
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

//открытие popup__edit
function openedPopup() {
  popupEdit.classList.add('popup_opened');
}

editProfileButton.addEventListener('click', openedPopup);

//закрытие popupEdit
function closePopup() {
  popupEdit.classList.remove('popup_opened');
}

closeButton[0].addEventListener('click', closePopup);

//сохранение popupEdit
function formSubmitHandlerEdit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileParagraph.textContent = jobInput.value;
  closePopup(popupEdit);
}
popupEdit.addEventListener('submit', formSubmitHandlerEdit);

//добавление 6 карточек, лайк, удаление карточки
function createNewCard({name, link}) {
    const cardElement= elementTemplate.querySelector('.element').cloneNode(true);
    const elementImage = cardElement.querySelector('.element__image');
    const cardLikeButtons = cardElement.querySelectorAll('.element__like-logo');
    const cardLikeButton = cardElement.querySelector('.element__like-logo');
    const cardDeleteButton = cardElement.querySelector('.element__trash');
    const elementTitle = cardElement.querySelector('.element__title');


    elementImage.src = link;
    elementImage.alt = `Фотография: ${name}`;
    elementTitle.textContent = name;

    elementImage.addEventListener('click', () => {
      openImagePopup(name, link);
    });

    cardLikeButtons.forEach(cardLikeButton =>cardLikeButton.addEventListener('click',(evt) =>{
      evt.target.classList.toggle('element__like-logo_active')
    }));

    cardDeleteButton.addEventListener('click', () => cardElement.remove());

    return cardElement;
  }

  initialCards.forEach(item => elements.prepend(createNewCard(item)));

//открытие addCardPopup
function openedPopupAdd() {
  addCardPopup.classList.add('popup_opened');
}
addCardButton.addEventListener('click', openedPopupAdd);

//закрытие addCardPopup
function closePopupAdd() {
  addCardPopup.classList.remove('popup_opened');
}
closeButton[1].addEventListener('click', closePopupAdd);

//добавление карточки перед elements
function renderCard(card) {
 elements.prepend(card);
}

//сохранение addCardPopup
function formSubmitHandlerAdd(event) {
  event.preventDefault();

  const item = {};
    item['name'] = inputTitle.value;
    item['link'] = inputUrl.value;

  renderCard(createNewCard(item));
  document.querySelector('popup__form').reset();
  closePopupAdd(addCardPopup);
}

addCardPopup.addEventListener('submit', formSubmitHandlerAdd);

document.querySelectorAll('.popup__save-button')[1].addEventListener('click', closePopupAdd);

//открытие addImagePopup
function openedPopupImage() {
  addImagePopup .classList.add('popup_opened');
}

//закрытие addImagePopup
function closePopupImage() {
  addImagePopup.classList.remove('popup_opened');
}

closeButton[2].addEventListener('click', closePopupImage);

//открытие полноразмерного изображения
function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = `Фотография: ${name}`;
  popupImageTitle.textContent = name;
  openedPopupImage(addImagePopup);
}
