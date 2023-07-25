## spotify-web-api-react

A React app recreating Spotify's UI.

## Project Status
#### NOTE: This project uses Spotify's web api, and is currently in developer mode. This means that only users who have been manually added can properly authenticate.

Approved users can authenticate with Spotify, then browse through their saved playlists. Playback can be controlled as well (play/pause/skip forward/skip back), and users can play songs from their saved playlists by clicking them. The app features both a dark and light mode, the design of which has been informed by Spotify's publicly available brand standards. 

## Feature Roadmap

- [x] User Authentication
- [x] Display & Browse User's Saved Playlists
- [x] Light/Dark Mode Toggle
- [x] Playback control
- [x] Homepage Features (favorite artists and top tracks)

## Project Screen Shot(s)

![Dark Mode](/src/assets/screenshot1.png?raw=true "Dark Mode")

![Light Mode](/src/assets/screenshot2.png?raw=true "Light Mode")

![Mobile](/src/assets/mob-ss1.png?raw=true "Mobile")

![Mobile (playlist drawer open)](/src/assets/mob-ss2.png?raw=true "Mobile (playlist drawer open)")


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
