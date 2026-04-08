export default function FavoritesPage({ favorites, onSelectMeal, onRemove }) {
  if (favorites.length === 0) {
    return (
      <div className="state-box welcome">
        <p>💔 Inca nu e nimic la favorite, du-te si cauta ceva bun!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">Favoritele mele: ({favorites.length})</h2>
      <div className="grid">
        {favorites.map((meal) => (
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
            </div>
            <div className="card-body">
              <p className="card-title">{meal.strMeal}</p>
              <span className="card-tag">{meal.strCategory}</span>
              <button
                className="btn-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(meal.idMeal);
                }}
              >
                Sterge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
