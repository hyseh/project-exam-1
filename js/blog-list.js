import { url } from './utilities/api.js';
import { hideLoader, toggleLoader } from './components/loader.js';
import { errorMessage, errorLoadMoreButton } from './components/error.js';

const targetAllPosts = document.querySelector('.flex-wrapper__list');
const loadMoreButton = document.querySelector('.load-more__container');

let currentPage = 1;
let itemsPerPage = 9;
let totalPages = [];
let totalItems = [];

const loadMore = () => {
  toggleLoader();
  currentPage++;
  fetchPosts();
  if (currentPage >= totalPages) {
    loadMoreButton.style.display = 'none';
  }
};

const fetchPosts = () => {
  let page = `?page=${currentPage}`;
  let items = `&per_page=${itemsPerPage}`;
  let embed = `&_embed=wp:featuredmedia,wp:term`;

  fetch(url + page + items + embed)
    .then((raw) => {
      totalPages = parseInt(raw.headers.get('x-wp-totalpages'));
      totalItems = parseInt(raw.headers.get('x-wp-total'));
      return raw;
    })
    .then((response) => response.json())
    .then((data) => {
      renderPosts(data, targetAllPosts);
    })
    .then(() => {
      hideLoader();
    })
    .catch((error) => {
      console.error(error);
      errorLoadMoreButton();
      errorMessage(
        'Beklager, det oppstod en feil',
        'Vennligst oppdater siden eller prøv igjen senere.',
        targetAllPosts
      );
      hideLoader();
    });
};

const renderPosts = (array, target) => {
  array.forEach((blog) => {
    let { date, id, title } = blog;

    let media = blog._embedded['wp:featuredmedia'][0];
    let media_height = media.media_details.height;
    let media_width = media.media_details.width;
    let { medium_large, large, full } = media.media_details.sizes;

    let game = blog._embedded['wp:term'][0][0];

    let formattedDate = new Date(date).toLocaleDateString('no-NO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    target.innerHTML += `
    <div class="blog-container">
    <a href="./blog-specific.html?id=${id}">
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
          <div class="blog-info__top">
            <p class="blog-info__game">${game.name}</p>
            <p class="blog-info__date">${formattedDate}</p>
          </div>
          <p class="blog-info__title">${title.rendered}</p>
        </div>
      </div>
    </a>
    </div>
    `;
  });
};

loadMoreButton.addEventListener('click', () => {
  loadMore();
});

fetchPosts();
