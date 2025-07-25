export interface Category {
  id: number;
  name: string;
}

export interface Game {
  gameId: number;
  gameDescription: string;
  categoryId: number;
  categoryName: string;
}

export interface WaitListEntry {
  id: number;
  email: string;
  games: Array<{
    gameId?: number;
    gameDescription: string;
    categoryId: number;
  }>;
  createdAt: string;
}

export interface WaitListDTO {
  email: string;
  games: Array<{
    gameId?: number;
    gameDescription?: string;
    categoryId: number;
  }>;
}

export interface WaitListFormData {
  email: string;
  selectedCategories: {
    esports: string[];
    boardGames: string[];
    sports: string[];
  };
  otherTexts: {
    esports: string;
    boardGames: string;
    sports: string;
  };
}

export interface GameOption {
  id: number;
  name: string;
}

export interface GameCategory {
  id: number;
  title: string;
  options: GameOption[];
}

export interface GamesData {
  esports: GameCategory;
  boardGames: GameCategory;
  sports: GameCategory;
}

export interface GameCategoryFromApi {
  id: number;
  name: string;
}

export interface GameFromApi {
  id: number;
  name: string;
  category: GameCategoryFromApi;
}
