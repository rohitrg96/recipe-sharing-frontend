# Recipe-Sharing Platform Frontend

This is the frontend for the Recipe-Sharing Platform built using React, TypeScript, and Vite. The frontend allows users to interact with the backend APIs for managing recipes, ratings, comments, and user authentication.

## Features

### Recipe Management

- **Create Recipe:** Form to create recipes with a title, ingredients, steps, and an image upload feature.
- **View Recipes:** Display a list of all available recipes with pagination.
- **Recipe Details:** View detailed information about a specific recipe, including ingredients, preparation steps, and an image.

### Search & Filter

- **Search by Ingredients:** Search bar to find recipes by ingredients.
- **Filter by Rating or Time:** Options to filter recipes by rating or preparation time.

### Ratings & Comments

- **Rate Recipes:** Option to rate recipes out of 5 stars.
- **Comment on Recipes:** Users can leave and update comments on recipes.

### User Authentication

- User-friendly interface for user registration, login, and logout.
- Restrict actions like view detail page, rating and commenting to authenticated users.

## Tech Stack

- **React**: Frontend library
- **TypeScript**: Type-safe development
- **Vite**: Modern development build tool
- **Bootstrap 5**: Styling framework

## Prerequisites

- [Node.js](https://nodejs.org/) installed (v16 or higher recommended)
- A running backend server (refer to [backend repository](https://github.com/your-username/recipe-sharing-backend))

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/recipe-sharing-frontend.git
   cd recipe-sharing-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build the project (for production):

   ```bash
   npm run build
   ```

## Project Structure

```
├── public            # Static assets
├── src
│   ├── components    # Reusable components (e.g., forms, recipe cards)
│   ├── hooks         # Custom hooks for state and logic reuse
│   ├── pages         # Page components (e.g., Add Recipe, Recipe Details, My Recipes)
│   ├── services      # API calls and integrations
│   ├── utils         # Backend API constants and utility functions
│   ├── App.tsx       # Application entry point
│   ├── main.tsx      # Vite entry point
├── .env              # Environment variables
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite configuration
├── package.json      # Project metadata
```

## Styling

- The project uses **Bootstrap 5** for responsive design and styling.

## Deployment

This frontend can be deployed on any static hosting platform. To deploy on Vercel:

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Set the environment variables in the Vercel dashboard.
