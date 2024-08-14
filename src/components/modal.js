export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", escCloseModal);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escCloseModal);
}

function escCloseModal(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
