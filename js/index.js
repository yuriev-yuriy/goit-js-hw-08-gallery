"use strict";
import pictures from "/gallery-items.js";

const listRef = document.querySelector(".js-gallery");

// Шаг 1 - создаю и вешаю разметку в HTML
const createGallery = (preview, original, description) => {
  const liRef = document.createElement("li");
  liRef.classList.add("gallery__item");
  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery-link");
  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery-image");
  liRef.appendChild(linkRef);
  linkRef.appendChild(imgRef);

  linkRef.href = original;
  imgRef.src = preview;
  imgRef.dataset.source = original;
  imgRef.alt = description;
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

listRef.addEventListener("click", onGalleryClick);

// Шаг 2 - подменяю src в link на data фтрибут img
function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const linkRef = document.querySelector("ul > li > a");
  const imgRef = event.target;
  console.log(imgRef.dataset);
  console.log(linkRef.src);
  linkRef.src = imgRef.dataset.source;
}
