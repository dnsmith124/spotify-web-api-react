## spotify-web-api-react

A React app recreating Spotify's UI.

#### NOTE: This project uses Spotify's web api, and is currently in developer mode. This means that only users who have been manually added can properly authenticate. Once the app is complete, I will submit a request with Spotify to move the project from developer mode to extended quota mode, which will allow any user to authenticate.  

Demo available here: [https://music.dnswebdev.com/](https://music.dnswebdev.com/)

## Project Status

This project is currently in development. 

Users can authenticate with Spotify, then browse through their saved playlists. Playback can be controlled as well (play/pause/skip forward/skip back), and users can play songs from their saved playlists by clicking them. 

## Feature Roadmap

- [x] User Authentication
- [x] Display & Browse User's Saved Playlists
- [x] Light/Dark Mode Toggle
- [x] Playback 
- [ ] Display User's Saved Tracks
- [ ] Homepage Features (Recommended playlists/albums, recent plays, etc.)
- [ ] Playlist Editing/Creation/Deletion 
- [ ] Artist/Song/Playlist Search 

## Project Screen Shot(s)

![Dark Mode](/src/assets/screenshot1.png?raw=true "Dark Mode")

![Light Mode](/src/assets/screenshot2.png?raw=true "Light Mode")


## Technologies used

Vite, Tailwind CSS, PostCSS, React Toastify, Fontawesome

Node v18.10.0
React v18.2.0

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm run dev`  

To Visit App:

`http://localhost:5173/` 
