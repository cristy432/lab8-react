import { useState } from "react";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import { useFavorites } from "./hooks/useFavorites";
import "./App.css";

const PAGES = { HOME: "home", DETAIL: "detail", FAVORITES: "favorites" };

function App() {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [homeState, setHomeState] = useState({
    query: "",
    category: "All",
    page: 1,
  });
  const { favorites, toggleFavorite, isFavorite, removeFavorite } =
    useFavorites();

  function handleSelectMeal(meal) {
    setSelectedMeal(meal);
    setCurrentPage(PAGES.DETAIL);
  }

  function handleBack() {
    setCurrentPage(PAGES.HOME);
    setSelectedMeal(null);
  }

  return (
    <div className="app">
      <nav className="nav">
        <span className="nav-brand">Retete cate vrei!</span>
        <div className="nav-links">
          <button
            className={`nav-btn ${currentPage === PAGES.HOME ? "active" : ""}`}
            onClick={() => setCurrentPage(PAGES.HOME)}
          >
            Home
          </button>
          <button
            className={`nav-btn ${currentPage === PAGES.FAVORITES ? "active" : ""}`}
            onClick={() => setCurrentPage(PAGES.FAVORITES)}
          >
            ❤️ Favorite
            {favorites.length > 0 && (
              <span className="badge">{favorites.length}</span>
            )}
          </button>
        </div>
      </nav>

      <main className="main">
        {currentPage === PAGES.HOME && (
          <HomePage
            onSelectMeal={handleSelectMeal}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
            savedState={homeState}
            onStateChange={setHomeState}
          />
        )}
        {currentPage === PAGES.DETAIL && selectedMeal && (
          <DetailPage
            meal={selectedMeal}
            onBack={handleBack}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        )}
        {currentPage === PAGES.FAVORITES && (
          <FavoritesPage
            favorites={favorites}
            onSelectMeal={handleSelectMeal}
            onRemove={removeFavorite}
          />
        )}
      </main>
    </div>
  );
}

export default App;
