const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const ROOT_DIR = path.join(__dirname, '..');
const FRONTEND_DIR = path.join(ROOT_DIR, 'frontend');
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DB_FILE = path.join(DATA_DIR, 'videos.json');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));
app.use(express.static(FRONTEND_DIR));

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename(req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

function readVideos() {
  const raw = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeVideos(videos) {
  fs.writeFileSync(DB_FILE, JSON.stringify(videos, null, 2));
}

app.post(
  '/upload',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  (req, res) => {
    const { title, description } = req.body;
    const videoFile = req.files && req.files.video ? req.files.video[0] : null;
    const thumbnailFile = req.files && req.files.thumbnail ? req.files.thumbnail[0] : null;

    if (!title || !videoFile) {
      return res.status(400).json({
        message: 'Title and video file are required.'
      });
    }

    const videos = readVideos();
    const newVideo = {
      id: Date.now().toString(),
      title,
      description: description || '',
      videoPath: `/uploads/${videoFile.filename}`,
      thumbnailPath: thumbnailFile ? `/uploads/${thumbnailFile.filename}` : '',
      createdAt: new Date().toISOString()
    };

    videos.unshift(newVideo);
    writeVideos(videos);

    return res.status(201).json(newVideo);
  }
);

app.get('/videos', (req, res) => {
  const videos = readVideos();
  res.json(videos);
});

app.get('/video/:id', (req, res) => {
  const videos = readVideos();
  const video = videos.find((item) => item.id === req.params.id);

  if (!video) {
    return res.status(404).json({ message: 'Video not found.' });
  }

  return res.json(video);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
