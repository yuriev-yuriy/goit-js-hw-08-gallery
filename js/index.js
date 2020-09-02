"use strict";
import pictures from "../gallery-items.js";

const listRef = document.querySelector(".js-gallery");
const modalImgRef = document.querySelector(".lightbox__image");
const openDivModal = document.querySelector(".lightbox");
const closeModalBtn = document.querySelector(
  "button[data-action=close-lightbox]"
);
const divModalGrey = document.querySelector(".lightbox__content");
const imgRef = document.createElement("img");

// Шаг 1 - создаю и вешаю разметку в HTML
const createGallery = (preview, original, description) => {
  const liRef = document.createElement("li");
  liRef.classList.add("gallery__item");
  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  liRef.appendChild(linkRef);
  linkRef.appendChild(imgRef);

  linkRef.href = original;
  imgRef.src = preview;
  imgRef.dataset.source = original;
  imgRef.alt = description;

  // Шаг 2 - Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.
  listRef.addEventListener("click", onGalleryClick);
  function onGalleryClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") {
      return;
    }
    const linkRef = document.querySelector("ul > li > a");
    const imgRef = event.target;
    linkRef.src = imgRef.dataset.source;
  }

  // Шаг 3 открытие и закрытие модального окна

  imgRef.addEventListener("click", onOpenModal);
  closeModalBtn.addEventListener("click", onCloseModal);
  divModalGrey.addEventListener("click", onGreyClick);

  function onOpenModal() {
    openDivModal.classList.add("is-open");
    // Шаг 4 Подмена значения атрибута src элемента img.lightbox__image
    modalImgRef.src = imgRef.dataset.source;
    modalImgRef.alt = imgRef.alt;
    window.addEventListener("keydown", onPressEsc);
  }
  function onCloseModal() {
    // Шаг 5 Закрытие модального окна по клику на кнопку button[data - action= "close-modal"].
    openDivModal.classList.remove("is-open");
    // Шаг 6 Очистка значения атрибута src элемента img.lightbox__image
    modalImgRef.setAttribute("src", "");
    window.removeEventListener("keydown", onPressEsc);
  }
  // Дополнительно - закрытие по серому полю на модалке
  function onGreyClick() {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  }
  // Дополнительно - закрытие при нажатии Esc
  function onPressEsc(event) {
    if (event.code === "Escape") {
      onCloseModal();
      console.log("Close");
    }
  }

  return liRef;
};

pictures.forEach((picture) => {
  const liElem = createGallery(
    picture.preview,
    picture.original,
    picture.description
  );
  listRef.appendChild(liElem);
});
