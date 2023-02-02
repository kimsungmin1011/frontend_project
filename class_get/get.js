const SERVER_URL = 'http://127.0.0.1:8000'

async function getPosts() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
}

async function deletePost(id) {
    let token = getCookie('access_token')
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorzation': `Bearer ${token}`
        }
    })
    if (response.status === 204) { // DELETE 요청 성공
        let post = document.getElementById(id);
        post.remove();
    }
}

async function postArticle(article) {
    let token = getCookie('access_token')
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method : 'POST',
        body: article,
        headers: {
          'Authorization' : `Bearer ${token}`
        },
    })
    let data = await response.json();
    return data
}

async function writePosts() {
    let posts = await postArticle();
    posts.forEach(post => {
        document.body.insertAdjacentHTML('beforeend', `
        <input name="title">
        <input name="content">
        <input name="category">
        <input type="file" name="image">
        `)
    })
}

async function insertPosts() {
    let posts = await getPosts();
    posts.forEach(post => {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="${post.id}">
                <h1>글쓴사람: ${post.author}</h1>
                <h1>제목: ${post.title}</h1>
                <p>내용: ${post.content}</p>
                <p>카테고리: ${JSON.stringify(post.category.name)}</p>
                <button onclick="deletePost(${post.id})">삭제</button>
                <hr>
            </div>
        `)
    })
}
insertPosts()

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }