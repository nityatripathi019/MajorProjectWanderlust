# Wanderlust 🌍

A full-stack travel listing web application where users can create, view, and review destinations. Built using the MERN stack (without React), Wanderlust follows the MVC architecture and integrates features like user authentication, session management, map API, and reviews.

---

## 🚀 Features

- 🧭 Browse and create travel listings
- ✍️ Post and manage user reviews
- 🔐 Authentication and session handling using **Passport.js**
- 📍 Interactive location maps via **Map API**
- 💾 Persistent data with **MongoDB**
- 🎨 Responsive UI using **Bootstrap**
- 🍪 Session tracking with **cookies**
- 🧱 Clean structure with **MVC architecture**
- ☁️ Ready for deployment on **Vercel**

---

## 🛠️ Technologies Used

- **Frontend**: HTML, CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: Passport.js, express-session
- **Other**: Mapbox API (or your preferred Map API), MVC architecture

---
## 📁 Project Folder Structure (MVC)

wanderlust/
<pre> ```bash wanderlust/ ├── models/ # Mongoose schemas ├── routes/ # Express routes ├── views/ # EJS templates ├── public/ # Static assets (CSS, JS, images) ├── controllers/ # Business logic ├── utils/ # Middleware and helper functions └── app.js # Entry point of the app ``` </pre>
## 🖼️ Screenshots

_Add screenshots or demo GIFs here if available._

---

## 🧰 Installation

```bash
# Clone the repository
git clone https://github.com/nityatripathi019/wanderlust.git
cd wanderlust

# Install dependencies
npm install

# Set up environment variables in a .env file
# Example:
# DB_URL=your_mongodb_uri
# SESSION_SECRET=your_secret_key
# MAPBOX_TOKEN=your_map_api_token

# Start the server
node app.js


