import { useState } from "react";

const STORAGE_KEY = "meal_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  function toggleFavorite(meal) {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.idMeal === meal.idMeal);
      const updated = exists
        ? prev.filter((f) => f.idMeal !== meal.idMeal)
        : [...prev, meal];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function isFavorite(meal) {
    return favorites.some((f) => f.idMeal === meal.idMeal);
  }

  function removeFavorite(mealId) {
    setFavorites((prev) => {
      const updated = prev.filter((f) => f.idMeal !== mealId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  return { favorites, toggleFavorite, isFavorite, removeFavorite };
}
