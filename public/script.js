// Fetch and display all posts
async function fetchPosts() {
    const res = await fetch('http://localhost:3000/api/posts');
    const posts = await res.json();
  
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = ''; // Clear previous posts
  
    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.className = 'post';
  
      // Content
      const content = document.createElement('p');
      content.textContent = post.content;
      postDiv.appendChild(content);
  
      // Media
      if (post.media) {
        const ext = post.media.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
          const img = document.createElement('img');
          img.src = `http://localhost:3000${post.media}`;
          img.style.width = '100%';
          postDiv.appendChild(img);
        } else if (['mp4', 'webm', 'ogg'].includes(ext)) {
          const video = document.createElement('video');
          video.src = `http://localhost:3000${post.media}`;
          video.controls = true;
          video.style.width = '100%';
          postDiv.appendChild(video);
        }
      }
  
      // Likes
      const likeBtn = document.createElement('button');
      likeBtn.innerHTML = `❤️ ${post.likes}`;
      likeBtn.onclick = () => likePost(post._id);
      postDiv.appendChild(likeBtn);
  
      // Comments
      const commentBtn = document.createElement('button');
      commentBtn.innerHTML = '💬 Comment';
      commentBtn.onclick = () => commentPost(post._id);
      postDiv.appendChild(commentBtn);
  
      // Show comments
      if (post.comments && post.comments.length > 0) {
        const commentHeader = document.createElement('p');
        commentHeader.innerHTML = '<strong>Comments:</strong>';
        postDiv.appendChild(commentHeader);
  
        post.comments.forEach(c => {
          const comment = document.createElement('p');
          comment.textContent = `• ${c}`;
          postDiv.appendChild(comment);
        });
      }
  
      postContainer.appendChild(postDiv);
    });
  }
  
  // Post with media
  async function postWithMedia() {
    const content = document.getElementById('postInput').value;
    const file = document.getElementById('mediaInput').files[0];
  
    const formData = new FormData();
    formData.append('content', content);
    if (file) formData.append('media', file);
  
    await fetch('http://localhost:3000/api/posts/media', {
      method: 'POST',
      body: formData
    });
  
    document.getElementById('postInput').value = '';
    document.getElementById('mediaInput').value = '';
    fetchPosts(); // Refresh posts
  }
  
  // Like a post
  async function likePost(id) {
    await fetch(`http://localhost:3000/api/posts/${id}/like`, { method: 'POST' });
    fetchPosts();
  }
  
  // Comment on a post
  async function commentPost(id) {
    const comment = prompt('Add your comment:');
    if (comment) {
      await fetch(`http://localhost:3000/api/posts/${id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
      });
      fetchPosts();
    }
  }
  
  // Fetch posts on page load
  fetchPosts();

