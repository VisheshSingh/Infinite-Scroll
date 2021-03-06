const postContainer = document.getElementById('post-container');
const loader = document.querySelector('.loader');
const filter = document.getElementById('filter');

const limit = 3;
let page = 1;

// FETCH POSTS
async function fetchPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// SHOW POSTS IN DOM
async function showPosts() {
  const posts = await fetchPosts();

  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
        <div class="post-info">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">
            ${post.body}
          </p>
        </div>`;

    postContainer.appendChild(postEl);
  });
}

showPosts();

function filterBlogs(e) {
  const term = e.target.value;
  const posts = document.querySelectorAll('.post');
  posts.forEach(post => {
    const title = document.querySelector('.post-title').innerText;
    const body = document.querySelector('.post-body').innerText;

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

function showLoading() {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterBlogs);
