# TODO - YouTube Clone Backend (MERN)

## Step 1: Bootstrap project
- Create `package.json` (ESM, dependencies, scripts)
- Create `.env.example`
- Create `app.js` + `server.js`

## Step 2: Core config and middleware
- Create `config/db.js` (MongoDB connection)
- Create `middleware/authMiddleware.js` (JWT verify)
- Create `utils/generateToken.js`

## Step 3: Models (Mongoose schemas)
- Create `models/User.js`
- Create `models/Channel.js`
- Create `models/Video.js`
- Create `models/Comment.js`

## Step 4: Controllers
- Create `controllers/authController.js` (register, login)
- Create `controllers/channelController.js` (createChannel, getChannelDetails)
- Create `controllers/videoController.js` (CRUD + list/get)
- Create `controllers/commentController.js` (add/get/delete)
- Create `controllers/likeController.js` (like/dislike with XOR)

## Step 5: Routes
- Create `routes/authRoutes.js`
- Create `routes/channelRoutes.js`
- Create `routes/videoRoutes.js`
- Create `routes/commentRoutes.js`
- Create `routes/likeRoutes.js`

## Step 6: Wire routes + error handling
- Mount routes in `app.js`
- Add 404 + error handler

## Step 7: Testing instructions
- Provide sample curl requests
- Provide run instructions

## Status
- Bootstrap created: package.json, .env.example, app.js, server.js
- DB + middleware + token util + models + controllers + routes created
- Remaining: add curl examples + update statuses



