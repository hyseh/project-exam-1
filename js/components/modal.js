export const toggleModal = () => {
  let modal = document.querySelector('.modal-container');

  let modalActive = false;

  if (!modalActive) {
    modal.classList.toggle('active');
    modalActive = true;
  } else {
    modal.classList.toggle('active');
    modalActive = false;
  }
};
