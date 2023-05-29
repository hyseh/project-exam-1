import { debounce } from '../utilities/debounce.js';

let nav = document.querySelector('.nav-container');
let hamburger = document.querySelectorAll('.nav-menu-button');

let menuActive = false;

const toggleNavMenu = () => {
  if (!menuActive) {
    nav.classList.toggle('active');
    menuActive = true;
  } else {
    nav.classList.toggle('active');
    menuActive = false;
  }
};

for (let i = 0; i < hamburger.length; i++) {
  hamburger[i].addEventListener('click', toggleNavMenu);
}

const closeMenuResize = () => {
  if (nav.classList.contains('active') && window.innerWidth >= 780) {
    nav.classList.remove('active');
    menuActive = false;
  } else {
    return;
  }
};

window.addEventListener('resize', debounce(closeMenuResize, 300));
