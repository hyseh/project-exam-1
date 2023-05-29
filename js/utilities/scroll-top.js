const buttonScrollUp = document.querySelector('.button__back-to-top');

const scrollToTop = () => {
  if (window.scrollY != 0) {
    document.body.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

buttonScrollUp.addEventListener('click', scrollToTop);
