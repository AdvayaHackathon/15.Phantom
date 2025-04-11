function postMessage() {
    let input = document.getElementById("postInput");
    let message = input.value.trim();
    if (message === "") return;

    let postContainer = document.getElementById("postContainer");
    let newPost = document.createElement("div");
    newPost.textContent = "Anonymous: " + message;
    newPost.className = "post";
    postContainer.prepend(newPost);

    input.value = "";
}

async function sendMessage() {
    let input = document.getElementById("userInput");
    let message = input.value.trim();
    if (message === "") return;

    let messagesDiv = document.getElementById("messages");
    let newMessage = document.createElement("div");
    newMessage.textContent = "You: " + message;
    messagesDiv.appendChild(newMessage);

    input.value = "";
}
document.addEventListener("DOMContentLoaded", loadPosts);

let posts = JSON.parse(localStorage.getItem("posts")) || [];

function loadPosts() {
    let postContainer = document.getElementById("postContainer");
    postContainer.innerHTML = "";

    posts.forEach((post, index) => {
        let newPost = document.createElement("div");
        newPost.className = "post";
        newPost.innerHTML = `
            <p><strong>Anonymous:</strong> ${post.message}</p>
            <button onclick="likePost(${index})">❤️ Like (<span id="likeCount-${index}">${post.likes}</span>)</button>
            <div class="comment-section">
                <textarea id="commentInput-${index}" placeholder="Write a comment..."></textarea>
                <button onclick="addComment(${index})">Comment</button>
                <div class="comments" id="comments-${index}">
                    ${post.comments.map(comment => `<p>💬 ${comment}</p>`).join("")}
                </div>
            </div>
        `;
        postContainer.prepend(newPost);
    });
}

function postMessage() {
    let input = document.getElementById("postInput");
    let message = input.value.trim();
    if (message === "") return;

    posts.push({ message: message, likes: 0, comments: [] });
    localStorage.setItem("posts", JSON.stringify(posts));
    input.value = "";
    loadPosts();
}

function likePost(index) {
    posts[index].likes++;
    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById(`likeCount-${index}`).innerText = posts[index].likes;
}

function addComment(index) {
    let commentInput = document.getElementById(`commentInput-${index}`);
    let comment = commentInput.value.trim();
    if (comment === "") return;

    posts[index].comments.push(comment);
    localStorage.setItem("posts", JSON.stringify(posts));
    commentInput.value = "";
    loadPosts();
}

