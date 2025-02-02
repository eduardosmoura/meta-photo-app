# meta-photo-app

MetaPhoto APP

## Table of Contents

- [meta-photo-app](#meta-photo-app)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Project Description](#project-description)
  - [Code Structure](#code-structure)
  - [Required Libraries \& Tools](#required-libraries--tools)
  - [Setup and Installation](#setup-and-installation)
  - [Compilation and Running](#compilation-and-running)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
  - [Running the Tests](#running-the-tests)
  - [Live Deployment](#live-deployment)
  - [Additional Notes](#additional-notes)

## Overview

MetaPhoto App is a lightweight web application built with ReactJS and TypeScript that allows users to view photos enriched with metadata (album and user information) fetched from an API. Users can navigate through photos using pagination (with offset and customizable page size) and apply various filtering options. This project focuses on correct implementation of requirements rather than UI design, and incorporates modern tools and best practices.

## Project Description

MetaPhoto App fetches photos from an API and enriches them with album and user details. The app supports filtering by photo title, album title, and user email. It also provides pagination controls to change the page size (limit) and offset. The focus is on the correct implementation of the functional requirements while leveraging modern React patterns and libraries.

## Code Structure

```text
meta-photo-app/
├── public/
    └── assets/
├── src/
    ├── components/
    ├── hooks/
    ├── services/
    ├── styles/
    └── utils/
```

## Required Libraries & Tools

- **[Vite](https://vitejs.dev/):** Fast build tool and development server.
- **[ReactJS](https://reactjs.org/):** UI library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** Typed superset of JavaScript.
- **[Vitest](https://vitest.dev/):** Testing framework for Vite projects.
- **[Testing Library](https://testing-library.com/):** Tools for testing React components.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework.
- **[Eslint](https://eslint.org/):** Linting tool to ensure code quality.
- **[Prettier](https://prettier.io/):** Code formatter for consistent style.
- **[Axios](https://axios-http.com/):** HTTP client for making API requests.
- **React Toastify:** For displaying error and status notifications.
- **React Loading Skeleton:** For loading skeleton React components.

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/meta-photo-app.git
   cd meta-photo-app
   ```

2. **Install Dependencies Using pnpm:**

   ```bash
   pnpm install --frozen-lockfile
   ```

3. **Environment Configuration:**

   Create environment files for different environments. For example, create a `.env` file in the project root with:

   ```dotenv
   VITE_API_BASE_URL=https://meta-photo-api-murex.vercel.app
   ```

   (You can also create `.env.development`, `.env.production`, etc.)

## Compilation and Running

### Development Mode

To run the project in development mode with live reload:

```bash
pnpm run dev
```

This will start the Vite development server.

### Production Mode

To build and serve the project in production mode:

1. **Build the Project:**

   ```bash
   pnpm run build
   ```

2. **Preview the Production Build:**

   ```bash
   pnpm run preview
   ```

## Running the Tests

The project uses Vitest for testing.

To run tests, execute:

```bash
pnpm run test
```

To run tests in watch mode:

```bash
pnpm run test:watch
```

## Live Deployment

A live deployment of the MetaPhoto App is available at:
**[https://meta-photo-app.vercel.app/](https://meta-photo-app.vercel.app/)**

## Additional Notes

- **Cache API Calls with useMemo:**
  The `usePhotos` hook caches API responses using the `useMemo` hook to avoid unnecessary network calls when filter parameters haven't changed. This improves performance by reducing duplicate API requests.

- **Lazy Loading:**
  Components like the `PhotoGallery` are lazily loaded using `React.lazy` and `Suspense`, which helps to improve the initial load time of the app.

- **Skeleton Loading Effects:**
  The app uses skeleton loading components (similar to Facebook) to provide a smooth loading experience while data is being fetched.

- **Error Handling with Toaster:**
  The app uses React Toastify to display error notifications and status updates to the user in a non-intrusive manner.

- **Default Logo Placeholder:**
  For images that fail to load, a default logo (or gravatar-like placeholder) is displayed, ensuring the UI remains consistent even when image requests fail.

- **Linting and Formatting:**
  ESLint and Prettier are configured to enforce code quality and consistent formatting throughout the project.

This project is built with modern tools and best practices, ensuring a performant, maintainable, and scalable web application. Enjoy building and extending the MetaPhoto App!
