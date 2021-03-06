//jshint esversion:9
const postsContainerEl = document.querySelector('.posts__container');
const loaderEl = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 3;
let page = 1;

// fetch posts form API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();

    return data;
}

// Render post in DOM
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = `
        <div class="post">
        <div class="number">${post.id}</div>
        <div class="post__info">
            <h2 class="post__title">${post.title}</h2>
            <p class="post__body">${post.body}</p>
        </div>
    </div>
        `;
        postsContainerEl.innerHTML += postEl;
    });
}

function showLoading() {
    loaderEl.classList.add('show');

    setTimeout(() => {
        loaderEl.classList.remove('show');
        setTimeout(() => {
            page++;
            showPosts();
        }, 300);
    }, 1000);
}

function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post__title').innerText.toUpperCase();
        const body = post.querySelector('.post__body').innerText.toUpperCase();

        console.log(title.indexOf(term));

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        }else{
            post.style.display = 'none';
        }

    });


}

showPosts();

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading();
    } else {

    }
});

filter.addEventListener('input', filterPosts);