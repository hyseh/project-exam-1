import { url } from './utilities/api.js';
import { hideLoader } from './components/loader.js';
import { errorMessage, errorSliderButtons } from './components/error.js';
import { lengthChecker, regexValidator } from './utilities/validation.js';

const targetNewest = document.querySelector('.newest-container__main');
const targetSlider = document.querySelector('.slider-container');

let currentPage = 1;
let itemsPerPage = 6;

const getLatest = () => {
  let page = `?page=${currentPage}`;
  let items = `&per_page=${itemsPerPage}`;
  let embed = `&_embed=wp:featuredmedia,wp:term`;

  fetch(url + page + items + embed)
    .then((response) => response.json())
    .then((data) => {
      renderNewest(data, targetNewest);
      renderLatest(data, targetSlider);
    })
    .then(() => {
      hideLoader();
    })
    .catch((error) => {
      console.error(error);
      errorSliderButtons();
      errorMessage(
        'Beklager, det oppstod en feil',
        'Vennligst oppdater siden eller prøv igjen senere.',
        targetNewest
      );
      errorMessage(
        'Beklager, det oppstod en feil',
        'Vennligst oppdater siden eller prøv igjen senere.',
        targetSlider
      );
      hideLoader();
    });
};

const renderNewest = (array, target) => {
  let newest = array[0];
  let { id, title } = newest;

  let media = newest._embedded['wp:featuredmedia'][0];
  let media_height = media.media_details.height;
  let media_width = media.media_details.width;
  let { medium_large, large, full } = media.media_details.sizes;

  let game = newest._embedded['wp:term'][0][0];

  target.innerHTML += `
  <div class="newest-blog-container">
    <a href="./blog-specific.html?id=${id}">
      <div class="newest-blog-container__content">
        <div class="newest-blog-image__container">
          <img
            srcset="
              ${medium_large.source_url} ${medium_large.width}w,
              ${large.source_url} ${large.width}w,
              ${full.source_url} ${full.width}w,
            "
            src="${media.source_url}"
            alt="${media.alt_text}"
            height="${media_height}"
            width="${media_width}"
            draggable="false"
          />
        </div>
        <div class="newest-blog-info__container">
          <p class="newest-blog-info__game">${game.name}</p>
          <p class="newest-blog-info__title">${title.rendered}</p>
        </div>
      </div>
    </a>
  <div>
  `;
};

const renderLatest = (array, target) => {
  array.forEach((blog) => {
    let { id, title } = blog;

    let media = blog._embedded['wp:featuredmedia'][0];
    let media_height = media.media_details.height;
    let media_width = media.media_details.width;
    let { medium_large, large, full } = media.media_details.sizes;

    let game = blog._embedded['wp:term'][0][0];

    target.innerHTML += `
    <div class="blog-container">
      <a href="./blog-specific.html?id=${id}" class="blog-link" draggable="false">
        <div class="blog-container__content">
          <div class="blog-image__container">
            <img
              srcset="
                ${medium_large.source_url} ${medium_large.width}w,
                ${large.source_url} ${large.width}w,
                ${full.source_url} ${full.width}w,
              "
              src="${media.source_url}"
              alt="${media.alt_text}"
              height="${media_height}"
              width="${media_width}"
              draggable="false"
            />
          </div>
          <div class="blog-info__container">
            <p class="blog-info__game">${game.name}</p>
            <p class="blog-info__title">${title.rendered}</p>
          </div>
        </div>
      </a>
    </div>
    `;
  });
};

getLatest();

const commonEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

const newsletterForm = document.querySelector('#newsletter-form');
const email = document.querySelector('#email');
const errorEmail = document.querySelector('#email-error');
const fullName = document.querySelector('#full-name');
const errorName = document.querySelector('#name-error');
const successMessage = document.querySelector('.form-success');

let emailCheck = false;
let nameCheck = false;

const validateNewsletter = () => {
  if (regexValidator(email.value, commonEmail) === true) {
    errorEmail.style.display = 'none';
    emailCheck = true;
  } else {
    errorEmail.style.display = 'block';
    emailCheck = false;
  }

  if (lengthChecker(fullName.value, 5)) {
    errorName.style.display = 'none';
    nameCheck = true;
  } else {
    errorName.style.display = 'block';
    nameCheck = false;
  }
};

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  validateNewsletter();

  if (emailCheck === true && nameCheck === true) {
    console.log('yes');
    successMessage.style.display = 'block';
  } else {
    console.log('no');
    successMessage.style.display = 'none';
  }
});
