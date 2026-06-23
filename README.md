# YouTube Clone Backend (MERN)

## Tech
- Node.js + Express (ES Modules)
- MongoDB + Mongoose
- JWT auth
- bcrypt password hashing

## Folder structure
- `config/db.js`
- `models/` (User, Channel, Video, Comment)
- `controllers/` (auth, video, comment, channel, like)
- `routes/` (authRoutes, videoRoutes, commentRoutes, channelRoutes, likeRoutes)
- `middleware/` (authMiddleware)
- `utils/` (generateToken)

## Setup
1. Install deps:
   - `cd backend`
   - `npm install`
2. Create env:
   - copy `.env.example` -> `.env`
   - set `MONGODB_URI`, `JWT_ACCESS_SECRET`
3. Run server:
   - `npm run dev` or `npm start`

Server runs on `http://localhost:5000`.

## API Routes (sample)
### Health
- `GET /api/health`

### Auth
- `POST /api/auth/register` `{ "username": "john", "email": "john@mail.com", "password": "pass123" }`
- `POST /api/auth/login` `{ "email": "john@mail.com", "password": "pass123" }`

Use `Authorization: Bearer <token>` for protected routes.

### Channel
- `POST /api/channel` `{ "name": "My Channel", "description": "optional" }`
- `GET /api/channel`

### Videos
- `GET /api/videos`
- `GET /api/videos/:id`
- `POST /api/videos` (protected) `{ "videoUrl": "https://...", "thumbnailUrl": "https://...", "title": "...", "description": "..." }`
- `PUT /api/videos/:id` (protected) `{ "videoUrl": "...", "thumbnailUrl": "...", "title": "...", "description": "..." }`
- `DELETE /api/videos/:id` (protected)

### Comments
- `GET /api/comments/video/:videoId`
- `POST /api/comments` (protected) `{ "videoId": "...", "content": "Nice video" }`
- `DELETE /api/comments/:commentId` (protected, author only)

### Like/Dislike
- `POST /api/likes/like` (protected) `{ "videoId": "..." }`
- `POST /api/likes/dislike` (protected) `{ "videoId": "..." }`

Reaction logic: a user can like OR dislike a given video; clicking the same reaction toggles it off.

