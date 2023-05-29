export const hideLoader = () => {
  let loader = document.querySelector('.loader');
  loader.classList.add('loader-hidden');
};

export const toggleLoader = () => {
  let loader = document.querySelector('.loader');

  if (loader.classList.contains('loader-hidden')) {
    loader.classList.remove('loader-hidden');
  } else {
    return;
  }
};
