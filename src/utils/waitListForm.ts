import { WaitListFormData, WaitListDTO, GamesData } from "../types/waitList";

export function transformFormDataToDTO(data: WaitListFormData, games?: GamesData): WaitListDTO {
  const gamesArray: WaitListDTO["games"] = [];
  if (!games) return { email: data.email, games: gamesArray };
  Object.entries(data.selectedCategories).forEach(([categoryKey, selectedGames]) => {
    const category = games[categoryKey as keyof GamesData];
    selectedGames.forEach((gameName) => {
      if (gameName === "Otros") {
        const customGameName = data.otherTexts[categoryKey as keyof typeof data.otherTexts];
        if (customGameName.trim()) {
          gamesArray.push({
            gameDescription: customGameName.trim(),
            categoryId: category.id,
          });
        }
      } else {
        const gameOption = category.options.find((option) => option.name === gameName);
        gamesArray.push({
          gameId: gameOption?.id,
          gameDescription: gameName,
          categoryId: category.id,
        });
      }
    });
  });
  return {
    email: data.email,
    games: gamesArray,
  };
}
