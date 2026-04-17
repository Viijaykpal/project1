# Mini Video Share (MVP)

A beginner-friendly video sharing web app using:
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Express
- **Uploads:** Multer + local `/uploads` folder
- **Storage:** JSON file (`/data/videos.json`)

## Features

### 1) Home Page (`/index.html`)
- Fetches videos from `GET /videos`
- Shows video thumbnail, title, and play button
- Click card/button to open Watch page

### 2) Upload Page (`/upload.html`)
- Upload form with:
  - Title
  - Description
  - Video file
  - Thumbnail image
- Sends data to `POST /upload`
- Saves files to `/uploads` and metadata to `/data/videos.json`

### 3) Watch Page (`/watch.html?id=<videoId>`)
- Fetches single video via `GET /video/:id`
- HTML5 video player with controls (play/pause/seek/etc.)
- Shows title + description

## Project Structure

```text
project1/
  backend/
    package.json
    server.js
  frontend/
    index.html
    upload.html
    watch.html
    css/styles.css
    js/home.js
    js/upload.js
    js/watch.js
  data/videos.json
  uploads/
  README.md
```

## Run Locally

```bash
cd backend
npm install
npm start
```

Server runs at: `http://localhost:3000`

## API Endpoints
- `POST /upload` → upload video + thumbnail
- `GET /videos` → list all videos
- `GET /video/:id` → get one video by id

