# WanderLust

WanderLust is a full-stack web app for discovering, creating, and reviewing travel stay listings. It is built with Node.js, Express, MongoDB, and EJS, with authentication, image uploads, and map-based location support.

## Features

- Create, edit, and delete property listings
- Add and remove reviews on listings
- User signup/login/logout with session-based authentication
- Image upload support via Cloudinary
- Listing location display using Mapbox

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- EJS + EJS-Mate
- Passport.js (local strategy)
- Cloudinary + Multer
- Mapbox SDK

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and add:

   ```env
   ATLASDB_LINK=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   MAPBOX_API_KEY=your_mapbox_api_key
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=development
   PORT=3000
   ```

3. Start the app:

   ```bash
   node app.js
   ```

4. Open `http://localhost:3000` in your browser.

