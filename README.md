# 🎬 YouTube Clone Backend (MERN Stack)

This is the backend API for the YouTube Clone application built using Node.js, Express, and MongoDB. It provides authentication, video management, channel management, and comment functionality.

---

## 🚀 Features

### 🔐 Authentication

* User Registration & Login
* JWT-based authentication
* Password hashing using bcrypt
* Protected routes using middleware

### 📺 Video Management

* Upload videos
* Fetch all videos
* Fetch single video
* Update video details
* Delete videos

### 💬 Comments System

* Add comments to videos
* Fetch comments for a video
* Delete comments (only by author)

### 📡 Channel System

* Create channel
* Fetch channel details
* Associate videos with channels

### 👍 Like / Dislike System

* Like a video
* Dislike a video
* Toggle reactions (only one at a time)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (Authentication)
* bcrypt (Password hashing)

---

## 📂 Folder Structure

```id="v9v1fx"
backend/
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Channel.js
│   ├── Video.js
│   └── Comment.js
├── controllers/
│   ├── authController.js
│   ├── videoController.js
│   ├── commentController.js
│   ├── channelController.js
│   └── likeController.js
├── routes/
│   ├── authRoutes.js
│   ├── videoRoutes.js
│   ├── commentRoutes.js
│   ├── channelRoutes.js
│   └── likeRoutes.js
├── middleware/
│   └── authMiddleware.js
├── utils/
│   └── generateToken.js
└── server.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash id="q8b5ci"
cd backend
npm install
```

---

### 2️⃣ Configure Environment Variables

Create a `.env` file:

```env id="m4j7kg"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 3️⃣ Run the Server

```bash id="2o5r8t"
npm run dev
```

Server will start at:

```id="g7l8kb"
http://localhost:5000
```

---

## 🧪 API Endpoints

### 🔹 Health Check

```http id="9r4u4v"
GET /api/health
```

---

### 🔹 Authentication

```http id="d0qj3y"
POST /api/auth/register
```

```json
{
  "username": "john",
  "email": "john@mail.com",
  "password": "password123"
}
```

```http id="3sd5jn"
POST /api/auth/login
```

```json
{
  "email": "john@mail.com",
  "password": "password123"
}
```

---

### 🔹 Channel

```http id="2qfzzl"
POST /api/channel
```

```json
{
  "name": "My Channel",
  "description": "My content"
}
```

```http id="8q3d0s"
GET /api/channel
```

---

### 🔹 Videos

```http id="ptn1rl"
GET /api/videos
```

```http id="8m5q3s"
GET /api/videos/:id
```

```http id="pnr0zy"
POST /api/videos
```

```json
{
  "title": "Video title",
  "description": "Description",
  "thumbnailUrl": "https://...",
  "videoUrl": "https://..."
}
```

```http id="q6w21j"
PUT /api/videos/:id
```

```http id="u3b4zp"
DELETE /api/videos/:id
```

---

### 🔹 Comments

```http id="7m3v8c"
GET /api/comments/video/:videoId
```

```http id="fj2o4n"
POST /api/comments
```

```json
{
  "videoId": "video_id",
  "content": "Nice video!"
}
```

```http id="1j8q2r"
DELETE /api/comments/:commentId
```

---

### 🔹 Like / Dislike

```http id="3m4n7x"
POST /api/likes/like
```

```http id="5k8r2z"
POST /api/likes/dislike
```

---

## 🔐 Authentication

For protected routes, include:

```http id="v3d6qn"
Authorization: Bearer <token>
```

---

## 📌 Notes

* Only authenticated users can:

  * Upload videos
  * Comment
  * Like/Dislike
  * Create channel
* Comments and videos can only be deleted by their owners
* Clean modular structure followed

---

## 👨‍💻 Author

**Greesh Sutar**
MERN Stack Developer

---

## ⭐ Conclusion

This backend provides a scalable REST API for a YouTube-like platform with authentication, CRUD operations, and user interactions, following best practices in Node.js and Express development.
