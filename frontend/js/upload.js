const uploadForm = document.getElementById('uploadForm');
const uploadMessage = document.getElementById('uploadMessage');

uploadForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  uploadMessage.textContent = 'Uploading...';

  const formData = new FormData(uploadForm);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      uploadMessage.textContent = data.message || 'Upload failed.';
      return;
    }

    uploadMessage.textContent = 'Upload successful! Redirecting to home...';
    uploadForm.reset();

    setTimeout(() => {
      window.location.href = '/index.html';
    }, 800);
  } catch (error) {
    uploadMessage.textContent = 'Something went wrong. Please try again.';
  }
});
