import { debounce } from '../utilities/debounce.js';

const carousel = document.querySelector('.slider-container');
const carouselButtons = document.querySelectorAll('.slide-button');

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  posistionDiff;

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragStart) return;
  isDragging = true;
  carousel.classList.add('dragging');
  carousel.scrollLeft = e.pageX;
  posistionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - posistionDiff;
  showHideIcons(carousel.scrollLeft);
  draggingLink();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove('dragging');
  if (!isDragging) return;
  isDragging = false;
  draggingLink();
};

carousel.addEventListener('mousedown', dragStart, { passive: true });
carousel.addEventListener('touchstart', dragStart, { passive: true });
carousel.addEventListener('mousemove', dragging, { passive: true });
carousel.addEventListener('touchmove', dragging, { passive: true });
carousel.addEventListener('mouseup', dragStop, { passive: true });
carousel.addEventListener('touchend', dragStop, { passive: true });
carousel.addEventListener('mouseleave', dragStop, { passive: true });

const draggingLink = () => {
  let blogLink = document.querySelectorAll('.blog-link');

  if (carousel.classList.contains('dragging')) {
    blogLink.forEach((e) => {
      e.setAttribute('onclick', 'return false');
    });
  } else {
    blogLink.forEach(() => {
      setTimeout(() => {
        blogLink.forEach((e) => {
          e.removeAttribute('onclick');
        });
      }, 100);
    });
  }
};

const showHideIcons = (pos = 0) => {
  let carouselButtonLeft = carouselButtons[0];
  let carouselButtonRight = carouselButtons[1];
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

  if (pos <= 0) {
    carouselButtonLeft.style.display = 'none';
  } else {
    carouselButtonLeft.style.display = 'block';
  }

  if (pos >= scrollWidth) {
    carouselButtonRight.style.display = 'none';
  } else {
    carouselButtonRight.style.display = 'block';
  }
};

const getBoxWidth = () => {
  let carouselFirstBox = document.querySelectorAll('.blog-container')[0];
  return carouselFirstBox.clientWidth + 20;
};

carouselButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.id == 'slide-button__left') {
      let scrollPos = (carousel.scrollLeft -= getBoxWidth());
      carousel.scrollLeft -= getBoxWidth();
      showHideIcons(scrollPos);
    } else {
      let scrollPos = (carousel.scrollLeft += getBoxWidth());
      carousel.scrollLeft += getBoxWidth();
      showHideIcons(scrollPos);
    }
  });
});

const showHideIconsResize = () => {
  let scrollPos = (carousel.scrollLeft -= getBoxWidth());
  showHideIcons(scrollPos);
};

window.addEventListener('resize', debounce(showHideIconsResize, 300));
