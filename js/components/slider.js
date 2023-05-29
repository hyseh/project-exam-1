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
  scrollPos = carousel.scrollLeft = prevScrollLeft - posistionDiff;
  scrollPosChecker();
  draggingLink();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove('dragging');
  if (!isDragging) return;
  isDragging = false;
  scrollPosChecker();
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

let scrollPos = 0;

let scrollWidth = () => {
  return carousel.scrollWidth - carousel.clientWidth;
};

const scrollPosChecker = () => {
  if (scrollPos < 0) {
    scrollPos = 0;
  } else {
    return scrollPos;
  }

  if (scrollPos > scrollWidth()) {
    scrollPos = scrollWidth();
  } else {
    return scrollPos;
  }
};

let getBoxWidth = () => {
  let carouselFirstBox = document.querySelectorAll('.blog-container')[0];
  return carouselFirstBox.clientWidth + 20;
};

carouselButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.id == 'slide-button__left') {
      carousel.scrollLeft -= getBoxWidth();
      scrollPos -= getBoxWidth();
      scrollPosChecker();
    } else {
      carousel.scrollLeft += getBoxWidth();
      scrollPos += getBoxWidth();
      scrollPosChecker();
    }
  });
});
