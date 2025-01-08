export interface Recipe {
  _id: string;
  title: string;
  image: string;
  starsCount: number;
  averageStars: number;
}

// Define types for Recipe and UserFeedback
export interface RecipeData {
  _id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  image: string | null;
  preparationTime: number;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  stars: Array<{
    user: { _id: string; firstName: string; lastName: string; email: string };
    rating: number;
    _id: string;
  }>;
  comments: Array<{
    user: { _id: string; firstName: string; lastName: string; email: string };
    comment: string;
    _id: string;
    createdAt: string;
  }>;
}

export interface UserFeedback {
  data: {
    checkIfUserhasCommented: {
      _id: string;
      comment: string;
      createdAt: string;
    } | null;
    checkIfUserhasRated: {
      _id: string;
      rating: string;
      createdAt: string;
    } | null;
  };
}

interface Pagination {
  totalPages: number;
  total: number;
  page: number;
  limit: number;
}

export interface FetchRecipesResponse {
  data: Recipe[];
  pagination: Pagination;
}

export interface RecipeSearchParams {
  ingredients?: string;
  title?: string;
  minRating?: string;
  maxPreparationTime?: string;
  page?: number;
  limit?: number;
}
