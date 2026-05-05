# Pokedex Diary (Refactored with Vite)

A refactored multi-page Pokémon application built with Vite, vanilla JavaScript, and TailwindCSS.  
The project was rebuilt from a legacy JavaScript codebase into a modern modular ES module architecture.

---

## Tech Stack

- Vite (fast build tool / bundler)
- Vanilla JavaScript (ES Modules)
- TailwindCSS
- PokéAPI
- LocalStorage
- HTML5 / CSS3

---

## Project Structure

pokedex-refactor/
├── index.html
├── journal.html
├── vite.config.js
├── package.json
├── src/
│   ├── home.js
│   ├── journal.js
|   ├── style.css
│   └── modules/
│       ├── api.js
│       ├── dialog.js
│       ├── render.js
│       ├── search.js
│       └── storage.js

---

## ⚙️ Installation & Setup

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

---

## Pages

- index.html → Main Pokédex page (home.js)
- journal.html → Favorites / journal page (journal.js)

Each page has its own JavaScript entry file using ES Modules.

---

## Features

- Fetch Pokémon data from PokéAPI
- Display Pokémon cards (image, name, stats)
- Multi-page application (MPA setup with Vite)
- Add/remove favorites (LocalStorage)
- Modular ES module architecture
- Clean code refactoring (separation of concerns)
- Edge case handling (empty results)
- API error handling (network failures, bad responses)

---

## Error Handling

- Shows user-friendly messages when API fails
- Handles empty Pokémon search results
- Prevents UI crashes on failed requests

---

## Refactoring Highlights

This project was rebuilt from a monolithic JavaScript structure into:

- Modular file system
- Separation of concerns (API / UI / Storage / Utils)
- ES module imports/exports
- Cleaner and scalable architecture

---

## Deployment

The project is deployed as a static site using Render.

Build command:
npm run build

Output directory:
dist/

---

## What I learned

- How Vite works as a modern frontend bundler
- ES Modules architecture in real projects
- Multi-page applications (MPA) setup
- Refactoring legacy JavaScript code
- API integration with error handling
- Clean code structure and modular design
- TailwindCSS integration