const videoList = document.getElementById('videoList');
const emptyState = document.getElementById('emptyState');

function createVideoCard(video) {
  const card = document.createElement('article');
  card.className = 'video-card';

  const thumbnail = document.createElement('img');
  thumbnail.className = 'thumb';
  thumbnail.src = video.thumbnailPath || 'https://placehold.co/640x360?text=No+Thumbnail';
  thumbnail.alt = `${video.title} thumbnail`;

  const content = document.createElement('div');
  content.className = 'video-content';

  const title = document.createElement('h3');
  title.className = 'video-title';
  title.textContent = video.title;

  const playButton = document.createElement('button');
  playButton.className = 'play-btn';
  playButton.type = 'button';
  playButton.textContent = '▶ Play';

  const openWatchPage = () => {
    window.location.href = `/watch.html?id=${video.id}`;
  };

  playButton.addEventListener('click', openWatchPage);
  card.addEventListener('click', openWatchPage);

  content.appendChild(title);
  content.appendChild(playButton);

  card.appendChild(thumbnail);
  card.appendChild(content);

  return card;
}

async function loadVideos() {
  try {
    const response = await fetch('/videos');
    const videos = await response.json();

    videoList.innerHTML = '';

    if (!videos.length) {
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    videos.forEach((video) => {
      videoList.appendChild(createVideoCard(video));
    });
  } catch (error) {
    emptyState.textContent = 'Failed to load videos. Please try again.';
    emptyState.style.display = 'block';
  }
}

loadVideos();
