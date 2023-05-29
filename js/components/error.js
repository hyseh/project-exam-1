export const errorMessage = (title = '', message = 'no message', target) => {
  target.innerHTML += `
  <div class="error-container">
    <div class="error-container__main">
      <p class="error-title"><b>${title}</b></p>
      <p>${message}</p>
    </div>
  </div>
  `;
};

export const errorSliderButtons = () => {
  let sliderWrapper = document.querySelector('.slider-wrapper');
  let sliderButtons = document.querySelectorAll('.slide-button');
  sliderWrapper.removeChild(sliderButtons[0]);
  sliderWrapper.removeChild(sliderButtons[1]);
};

export const errorLoadMoreButton = () => {
  let blogListContainer = document.querySelector('.blog-list-container__main');
  let loadMoreButton = document.querySelector('.load-more__container');
  blogListContainer.removeChild(loadMoreButton);
};
