# WanderLust

WanderLust is a full-stack travel listing platform that allows users to create, discover, and review properties with secure authentication, media management, and geolocation-based visualization.

The application is designed with a focus on scalability, modular backend architecture, and real-world deployment practices.

## Preview

![WanderLust Preview](/public/images/Solidx.png)

## Project Link

- Live Demo: [Wanderlust](https://wanderlust-bc5x.onrender.com/)
## Features

- Implemented secure session-based authentication using Passport.js with hashed credentials and protected routes
- Designed RESTful APIs for listings and reviews with proper MVC architecture
- Integrated Cloudinary for optimized image storage and delivery
- Used Mapbox to render dynamic location-based listings
- Built a review system with relational data modeling using MongoDB references
- Implemented server-side validation and error handling middleware

## Tech Stack

- Backend: Node.js, Express
- Database: MongoDB (Mongoose ODM)
- Authentication: Passport.js (Local Strategy)
- Frontend: EJS, EJS-Mate
- Media: Cloudinary
- Maps: Mapbox SDK

## Architecture

The application follows MVC architecture:

- Models: MongoDB schemas for Users, Listings, Reviews
- Controllers: Business logic separation for routes
- Routes: RESTful routing structure
- Middleware: Authentication, validation, and error handling

## Challenges & Learnings 

- Handling image uploads and storage efficiently
- Managing user sessions securely
- Designing relational data in a NoSQL database
- Integrating third-party APIs (Mapbox, Cloudinary)

