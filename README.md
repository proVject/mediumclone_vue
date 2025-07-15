# 📰 RealWorld Vue2 Medium Clone

> A full-featured Medium.com clone built with **Vue 2**, **Vuex**, **Vue Router**, and **Axios** – part of the [RealWorld](https://github.com/gothinkster/realworld) project specification.

> sometimes the backend side is down if you test it. 

This project demonstrates how to build a **real-world fullstack application** using Vue 2 as the frontend framework. It includes authentication, article CRUD, tag filtering, user profiles, and more.

![RealWorld Demo](https://raw.githubusercontent.com/gothinkster/realworld/refs/heads/main/media/realworld-dual-mode.png)

---

## 🚀 Live Demo

You can try a live version using the RealWorld API backend:  
The code with GH pages
🔗 https://provject.github.io/mediumclone_vue/

or

RealWorld demo
🔗 https://demo.realworld.io/#/

---

## ⚙️ Tech Stack

- ✅ **Vue 2** – Component-based UI
- ✅ **Vue Router** – Client-side routing
- ✅ **Vuex** – Centralized state management
- ✅ **Axios** – Promise-based HTTP client

---

## ✨ Features

- 🔐 **Authentication**
    - Sign up, login, logout
    - JWT token management
- ✍️ **Article Management**
    - Create, edit, delete articles (Markdown support)
    - Like/unlike articles

[//]: # (- 💬 **Comments**)

[//]: # (    - Add and delete comments)
- 🏷 **Tags**
    - Global tag feed and article filtering
- 👤 **User Profiles**
    - View author profiles and their articles
    - Follow/unfollow users
- 📰 **Feed**
    - Your personal feed and global article feed
- 🧭 **Routing**
    - Navigation with guards for protected routes

---

## 📦 Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Build for production
npm run build