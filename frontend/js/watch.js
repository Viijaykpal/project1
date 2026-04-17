const watchContainer = document.getElementById('watchContainer');

function getVideoId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderVideo(video) {
  watchContainer.innerHTML = `
    <h2>${video.title}</h2>
    <video controls>
      <source src="${video.videoPath}" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <p>${video.description || 'No description provided.'}</p>
  `;
}

async function loadVideo() {
  const id = getVideoId();

  if (!id) {
    watchContainer.innerHTML = '<p>Missing video id.</p>';
    return;
  }

  try {
    const response = await fetch(`/video/${id}`);

    if (!response.ok) {
      throw new Error('Video not found');
    }

    const video = await response.json();
    renderVideo(video);
  } catch (error) {
    watchContainer.innerHTML = '<p>Unable to load video.</p>';
  }
}

loadVideo();
