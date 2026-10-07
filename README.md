# 🚀 PingUp

PingUp is a full-stack social media platform where users can share posts and stories, connect with other people, chat, and manage their profiles. It has a React (Vite) frontend and an Express + MongoDB backend, with Clerk for authentication, ImageKit for media, Brevo for transactional emails and Inngest for background jobs.

**🌐 Live Demo:** [ping-up-ruddy.vercel.app](https://ping-up-ruddy.vercel.app/)


---

## ✨ Features

- 🔐 **Authentication** with Clerk (sign up, login, sessions) and protected API routes
- 📝 **Posts** with text and images: create, view and like
- 📖 **Stories** with a stories bar and full-screen story viewer
- 🤝 **Connections**: discover people, send requests, follow and manage connections
- 💬 **Messaging** with a chat box and recent conversations
- 👤 **Profiles** with editable profile details and a profile modal
- 🔔 **Notifications** for user activity
- 🖼️ **Image uploads** via Multer, stored and optimized with ImageKit
- 📧 **Transactional emails** via Brevo (SMTP with Nodemailer)
- ⏱️ **Background jobs** and scheduled tasks with Inngest
- 🌗 **Theme switching** (light/dark)
- 📱 **Responsive UI** built with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Redux Toolkit, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | Clerk |
| Media | ImageKit, Multer |
| Email | Brevo (via Nodemailer) |
| Background jobs | Inngest |
| Deployment | Vercel (client and server deployed separately) |

---

## 🏗️ Architecture

```
┌──────────────┐   Axios (Bearer token)   ┌───────────────────┐
│  React app   │ ───────────────────────► │   Express API     │
│  (Vite)      │ ◄─────────────────────── │   (REST, JSON)    │
│  Redux store │                          │                   │
└──────┬───────┘                          └─────┬─────────────┘
       │ Clerk (login/session)                  │ auth middleware verifies Clerk session
       ▼                                        ▼
   ┌────────┐                  ┌─────────────┬──────────┬──────────┐
   │ Clerk  │                  │  MongoDB    │ ImageKit │ Inngest  │
   └────────┘                  │ (Mongoose)  │ (media)  │ (jobs)   │
                               └─────────────┴──────────┴────┬─────┘
                                                             ▼
                                                   Brevo (emails)
```

**Request flow:** the user acts in the React UI → Axios calls an Express route with the Clerk session token → the auth middleware verifies the user → the controller reads or writes MongoDB (uploading images to ImageKit when needed) → the JSON response updates the Redux store and the UI.

---

## 📁 Project Structure

```
PingUp/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── api/axios.js        # Axios instance (base URL, auth header)
│   │   ├── app/store.js        # Redux store
│   │   ├── features/           # Redux slices: user, connections, messages, theme
│   │   ├── components/         # PostCard, StoriesBar, StoryViewer, Sidebar, UserCard, ...
│   │   ├── pages/              # Feed, Profile, Discover, Connections, Messages, ChatBox, CreatePost, Login, Layout
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json
│   └── vite.config.js
│
└── server/                     # Express backend
    ├── configs/                # db.js, imagekit.js, multer.js, nodeMailer.js
    ├── controllers/            # user, post, story, message logic
    ├── inngest/                # Inngest client and background functions
    ├── middlewares/auth.js     # Verifies Clerk session on protected routes
    ├── models/                 # User, Post, Story, Message, Connection (Mongoose)
    ├── routes/                 # userRoutes, postRoutes, storyRoutes, messageRoutes
    ├── server.js               # App entry point
    └── vercel.json
```

---

## 🗄️ Data Models

- **User:** profile details and Clerk user ID
- **Post:** author, content, image URLs, likes
- **Story:** author, media, created time
- **Message:** sender, receiver, content and media
- **Connection:** the relationship and status between two users

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A MongoDB database (local or Atlas)
- Accounts for Clerk, ImageKit, Inngest and Brevo

### 1. Clone the repo

```bash
git clone https://github.com/Shivanshu-Jha/PingUp.git
cd PingUp
```

### 2. Set up the server

```bash
cd server
npm install
```

Create `server/.env`:

```env
# Names below are examples; make sure they match the ones used in your code
MONGODB_URI=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
SMTP_USER=
SMTP_PASS=
SENDER_EMAIL=
FRONTEND_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev     # or: npm start
```

### 3. Set up the client

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_BASEURL=http://localhost:4000
```

Start the client:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

> ⚠️ Never commit `.env` files. They are listed in `.gitignore`.

---

## 🌍 Deployment

The client and server are deployed as two separate Vercel projects, each with its own `vercel.json`.

1. Deploy `server/` and add all server environment variables in Vercel.
2. Deploy `client/` and set `VITE_BASEURL` to the deployed server URL.
3. Allow the client's URL in the server's CORS configuration.

