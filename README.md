## spotify-web-api-react

A React app recreating Spotify's UI via spotify-web-api and spotify-web-api-js.

#### NOTE: This project uses Spotify's web api, and is currently in developer mode. This means that only users who have been manually added can properly authenticate. Once the app is complete, I will submit a request with Spotify to move the project from developer mode to extended quota mode, which will allow any user to authenticate.  

Demo available here: [https://spotify.dnswebdev.com/](https://spotify.dnswebdev.com/)

## Project Status

This project is currently in development. Users can authenticate with Spotify, then browse through their saved playlists. 

## Feature Roadmap

- [x] User Authentication
- [x] Display & Browse User's Saved Playlists
- [x] Light/Dark Mode Toggle
- [ ] Playback 
- [ ] Display User's Saved Tracks
- [ ] Playlist Editing/Creation/Deletion 
- [ ] Artist/Song/Playlist Search 

<!-- ## Project Screen Shot(s)

[ PRETEND SCREEN SHOT IS HERE ]

[ PRETEND OTHER SCREEN SHOT IS HERE ] -->

## Technologies used

Vite, Tailwind CSS, and [spotify-web-api-js](https://github.com/JMPerez/spotify-web-api-js)


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
