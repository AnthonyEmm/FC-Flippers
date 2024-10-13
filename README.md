# FC Flippers - FC Flippers Project

Welcome to the &copy;FC Flippers project! This is the FC Flippers football club website. Below you will find the documentation to help you get started with setting up the project.

## Table of Contents

- [FC Flippers - Football Club Project](#fcflippers---football-club-project)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Dependencies](#dependencies)
  - [Project Structure](#project-structure)

## Project Overview

&copy;FC Flippers is a web application designed to provide a seamless experience. The project uses modern web technologies such as React + Vite and TailwindCSS for a fast and efficient development experience.

## Features

- Browse teams
- Club News
- Stadium
- Detailed matches and fixtures
- Teams League standing table
- Live Chat
- Appealling Tooltips
- Forms (Simulation)
- Club videos
- Page translations using i18next
- Animated page transitions
- Notifications for user interactions
- Online Shop/Checkout page integration (Simulation)

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone `[https://github.com/AnthonyEmm/FC-Flippers.git]`
   cd fc-flippers
   ```
2. Install the dependencies:

   ```sh
   npm install
   ```

3. Install Tailwind CSS and its dependencies:

```sh
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
```

4. Configure Tailwind CSS:

Update the `tailwind.config.js` file to include the paths to all of your template files:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Exo", "Roboto", "san-serif"],
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15%)" },
        },
      },
      animation: {
        bounceOnce: "bounce 1s ease-in-out 3",
      },
      scrollBehavior: {
        smooth: "smooth",
      },
    },
  },
  plugins: [],
};
```

5. Include Tailwind in your CSS:

Create a CSS file `src/index.css` and add the Tailwind directives:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. Import the CSS and i18n configuration in your application:

Import the `index.css` file in your main JavaScript/JSX file `src/main.jsx`

```jsx
// src/main.jsx
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
);
```

```js
// src/i18n.js translation configuration
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./translations/en.json";
import translationDE from "./translations/de.json";
import translationFR from "./translations/fr.json";
import translationES from "./translations/es.json";
import translationIT from "./translations/it.json";
import translationRU from "./translations/ru.json";

const resources = {
  en: { translation: translationEN },
  de: { translation: translationDE },
  fr: { translation: translationFR },
  es: { translation: translationES },
  it: { translation: translationIT },
  ru: { translation: translationRU },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    debug: true,
    detection: {
      order: ["queryString", "cookie"],
      cache: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

## Running the Project

To run the project in development mode:

1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173/` to see the application in action.

## Dependencies

DeluxRental uses the following dependencies:

- `aos`: Animate on scroll library for scroll animations.
- `react`: A JavaScript library for building user interfaces.
- `react-dom`: Provides DOM-specific methods for React.
- `react-icons`: Icons library for React.
- `react-cookie`: Universal cookies for React.
- `react-router-dom`: Declarative routing for React.
- `i18next-browser-languagedetector`: React language detector used in browser environment for i18next.
- `react-i18next`: Powerful internationalization framework for React / React Native which is based on i18next.
- `react-router-hash-link`: Hash link functionality for React Router.
- `react-slick`: Carousel component built with React.
- `react-tooltip`: React tooltip library.
- `framer-motion`: Open-Source React animation and gesture library.
- `react-swipeable`: React component that allows users to detect swipe events on mobile devices.
- `tailwindcss`: Utility-first CSS framework.
- `slick-carousel`: Library slideshow component for cycling through elements—images or slides of text.

The versions of these dependencies are specified in the `package.json` file.

## Creating environment variable file

In the project root add your API key from Tawk.to. This will ensure chats are sent successfully from the chat bot:

```
VITE_TAWKTO_URL=https://embeded.Tawktolink copied from Tawk.to after setup
```

## Project Structure

The project structure is organized as follows:

```arduino
DeluxRental/
├── node_modules
├── public/
│   ├── jsonDataFiles
│   ├── videos
│   ├── images
├── src/
│   ├── components/
    ├── translations
        ├── de.json
        ├── en.json
        ├── es.json
        ├── fr.json
        ├── it.json
    ├── assets/
│   ├── App.jsx
│   ├── i18n.js
│   ├── index.css
│   ├── main.jsx
├── .env
├── .gitignore
├── .eslintrc.js
│   ├── index.html
├── .package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── README.md
└── vite.config.js
```

- public/: Contains static files such as the HTML template, videos and images.
- src/: Contains the source code for the application.
  - assets/: unused asset.
  - jsonDataFiles/: Contains json Data Files for various components.
  - components/: Contains reusable React components.
  - translations/: Contains translation json files in 5 languages.
  - App.jsx: The root component of the application.
  - i18n/: Contains translation initial configurations and imports.
  - main.jsx: The entry point of the application.
  - .env: The environment variable for the Live Chat integration (visit Tawk.to: https://www.tawk.to/ to register and configure).
- .gitignore: Specifies which files and directories to ignore in the repository.
- package.json: Lists the project dependencies and scripts.
- postcss.config.js: Configuration file for PostCSS.
- tailwind.config.js: Configuration file for Tailwind CSS.
- README.md: The documentation file you are currently reading.
- vite.config.js: Configuration file for Vite.
