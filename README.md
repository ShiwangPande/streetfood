# KartMatch: When Chat Meets Kart

KartMatch is a mobile application connecting users with nearby street food vendors.  The app provides a curated list of vendors, allowing users to filter based on preferences (hygiene, taste, hospitality), view locations on a map, and add vendors to a wishlist.

## Features and Functionality

* **Vendor Discovery:** Browse a list of street food vendors with photos, ratings, and menus.
* **Preference-Based Filtering:** Filter vendors based on hygiene, taste, and hospitality ratings.
* **Interactive Map:** View vendor locations on an interactive map with directions.
* **Wishlist:** Save favorite vendors to a wishlist for easy access.
* **Parental Consent and Safety Reminders:**  Prompts users to acknowledge safety guidelines and obtain parental consent (for underage users).
* **Comment Functionality:** (Enabled/disabled via parental controls) Allows users to leave comments about vendors.


## Technology Stack

* **Frontend:** React, React Router, Leaflet (for mapping), NextUI, Framer Motion, axios
* **Backend:** (Assumed from API calls) Node.js, Express.js, MongoDB (or similar)
* **Mobile:** Capacitor (for cross-platform development - Android and iOS)
* **Map API:** OpenCageData (for reverse geocoding), Google Maps (for directions)


## Prerequisites

* Node.js and npm (or yarn)
* Android Studio (for Android development) or Xcode (for iOS development)
* Capacitor CLI


## Installation Instructions

1. Clone the repository: `git clone https://github.com/ShiwangPande/streetfood.git`
2. Navigate to the project directory: `cd streetfood`
3. Install dependencies: `npm install` (or `yarn install`)
4. For Android:
    *  Run `npx cap add android`
    *  Open the `android` folder in Android Studio and build the app.
5. For iOS:
    * Run `npx cap add ios`
    * Open the `ios` folder in Xcode and build the app.


## Usage Guide

1. **Onboarding:** The app starts with a survey to determine user preferences.
2. **Vendor Browsing:** After completing the survey, users can browse vendors using the main screen or map.
3. **Filtering:** Use the filter options to refine vendor search results.
4. **Map View:** The map displays vendors, allowing users to navigate to their locations.
5. **Wishlist:** Add vendors to the wishlist by swiping right on their card in the main view. Access the wishlist from the top right icon in the navigation bar.
6. **Comments:** Leave comments on vendor profiles (if enabled through parental controls).


## API Documentation

The application uses a backend API located at `https://kartmatchbackend.onrender.com`.  Specific endpoints are used for fetching vendors (`/vendors`),  comments (`/api/vendors/:vendorId/comments`), and adding comments (`/api/vendors/:vendorId/comments`).  Authentication and authorization mechanisms are not explicitly defined in the provided code.  The OpenCageData API (`https://api.opencagedata.com`) is used for reverse geocoding addresses; an API key is required and is assumed to be stored in environment variables (`process.env.REACT_APP_API_URL`).

## Contributing Guidelines

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes and commit them with clear messages.
4. Create a pull request with a detailed description of your changes.


## License Information

License information is not specified in the repository.


## Contact/Support Information

For any questions or support, please contact shiwangpande1@gmail.com
