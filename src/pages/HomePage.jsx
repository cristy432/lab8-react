import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

const ITEMS_PER_PAGE = 12;

export default function HomePage({
  onSelectMeal,
  isFavorite,
  onToggleFavorite,
  savedState,
  onStateChange,
}) {
  const [query, setQuery] = useState(savedState.query);
  const [inputValue, setInputValue] = useState(savedState.query);
  const [category, setCategory] = useState(savedState.category);
  const [page, setPage] = useState(savedState.page);

  const searchUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const categoriesUrl = `https://www.themealdb.com/api/json/v1/1/categories.php`;

  const { data: searchData, loading, error } = useFetch(searchUrl);
  const { data: catData } = useFetch(categoriesUrl);

  const categories = catData?.categories || [];
  const allMeals = searchData?.meals || [];
  const filtered =
    category === "All"
      ? allMeals
      : allMeals.filter((m) => m.strCategory === category);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    onStateChange({ query, category, page });
  }, [query, category, page]);

  function handleSearch() {
    setQuery(inputValue);
    setPage(1);
  }

  function handleCategoryChange(val) {
    setCategory(val);
    setPage(1);
  }

  const isEmpty = !loading && !error && filtered.length === 0;

  return (
    <div>
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Cauta retete..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="btn-primary" onClick={handleSearch}>
          Cauta
        </button>
        <select
          className="filter-select"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All">Toate Categoriile</option>
          {categories.map((cat) => (
            <option key={cat.idCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="state-box">
          <div className="spinner" />
          <p>Se incarca...</p>
        </div>
      )}

      {error && (
        <div className="state-box error">
          <p>⚠️ Error: {error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && query === "" && (
        <div className="state-box welcome">
          <p>Scrie un nume de mancare, si vezi cum se gateste.</p>
        </div>
      )}

      {isEmpty && query !== "" && (
        <div className="state-box">
          <p>
            Nu exista asa lături: <strong>"{query}"</strong>
            {category !== "All" ? ` in ${category}` : ""}.
          </p>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="results-info">
          {filtered.length} rezultat{filtered.length !== 1 ? "e" : ""} · Pagina{" "}
          {page} din {totalPages}
        </div>
      )}

      <div className="grid">
        {paginated.map((meal) => (
          <div
            key={meal.idMeal}
            className="card"
            onClick={() => onSelectMeal(meal)}
          >
            <div className="card-img-wrap">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="card-img"
              />
              <button
                className={`fav-btn ${isFavorite(meal) ? "faved" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(meal);
                }}
                title={
                  isFavorite(meal)
                    ? "Sterge din Favorite"
                    : "Adauga la favorite"
                }
              >
                {isFavorite(meal) ? "❤️" : "🤍"}
              </button>
            </div>
            <div className="card-body">
              <p className="card-title">{meal.strMeal}</p>
              <span className="card-tag">{meal.strCategory}</span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-page"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            ← Inapoi
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`btn-page ${p === page ? "active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="btn-page"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Urmatoarea →
          </button>
        </div>
      )}
    </div>
  );
}
