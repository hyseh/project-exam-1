import { url } from './utilities/api.js';
import { toggleModal } from './components/modal.js';
import { hideLoader } from './components/loader.js';
import { errorMessage } from './components/error.js';

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get('id');

const targetSpecific = document.querySelector('.blog-post-container__main');

const getSpecific = () => {
  let embed = `?_embed=wp:featuredmedia,wp:term`;

  fetch(url + id + embed)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .then((blog) => {
      document.title = `Viking Spiller Spill - ${blog.title.rendered}`;
      renderSpecific(blog, targetSpecific);
    })
    .then(() => {
      let blogImage = document.querySelector('.blog-image__container');
      let modalButton = document.querySelector('.modal-button');
      blogImage.addEventListener('click', toggleModal);
      modalButton.addEventListener('click', toggleModal);
    })
    .then(() => {
      hideLoader();
    })
    .catch((error) => {
      console.error(error);
      errorMessage(
        'Beklager, det oppstod en feil',
        'Vennligst oppdater siden eller prøv igjen senere.',
        targetSpecific
      );
      hideLoader();
    });
};

const renderSpecific = (array, target) => {
  let { content, date, id, title } = array;

  let media = array._embedded['wp:featuredmedia'][0];
  let media_height = media.media_details.height;
  let media_width = media.media_details.width;
  let { medium_large, large, full } = media.media_details.sizes;

  let game = array._embedded['wp:term'][0][0];

  let formattedDate = new Date(date).toLocaleDateString('no-NO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  target.innerHTML += `
  <div class="blog-container">
    <div class="blog-container__content">
      <div class="blog-info__container">
        <p class="blog-info__title">${title.rendered}</p>
        <p class="blog-info__date">${formattedDate}</p>
      </div>
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
      <div class="blog-text__container">
        ${content.rendered}
      </div>
    </div>
  </div>
  <div class="modal-container">
    <div class="modal-container__content">
     <div class="modal-button__container">
        <button id="modal-button" class="modal-button">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="modal-image__container">
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
    </div>
  </div>
  `;
};

getSpecific();
