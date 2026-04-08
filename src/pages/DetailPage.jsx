import { useFetch } from "../hooks/useFetch";

export default function DetailPage({
  meal,
  onBack,
  isFavorite,
  onToggleFavorite,
}) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
  const { data, loading, error } = useFetch(url);

  const details = data?.meals?.[0];

  const ingredients = [];
  if (details) {
    for (let i = 1; i <= 20; i++) {
      const ing = details[`strIngredient${i}`];
      const measure = details[`strMeasure${i}`];
      if (ing && ing.trim()) {
        ingredients.push(`${measure?.trim() || ""} ${ing.trim()}`.trim());
      }
    }
  }

  return (
    <div className="detail">
      <button className="btn-back" onClick={onBack}>
        ← Inapoi la rezultate
      </button>

      {loading && (
        <div className="state-box">
          <div className="spinner" />
          <p>Loading details...</p>
        </div>
      )}

      {error && (
        <div className="state-box error">
          <p>Nu s-au putut incarca detalii: {error}</p>
        </div>
      )}

      {details && (
        <div className="detail-content">
          <div className="detail-header">
            <img
              src={details.strMealThumb}
              alt={details.strMeal}
              className="detail-img"
            />
            <div className="detail-meta">
              <h1 className="detail-title">{details.strMeal}</h1>
              <div className="detail-tags">
                <span className="tag">{details.strCategory}</span>
                <span className="tag">{details.strArea}</span>
                {details.strTags &&
                  details.strTags.split(",").map((t) => (
                    <span key={t} className="tag">
                      {t.trim()}
                    </span>
                  ))}
              </div>
              <button
                className={`btn-fav ${isFavorite(details) ? "faved" : ""}`}
                onClick={() => onToggleFavorite(details)}
              >
                {isFavorite(details) ? "❤️ Salvat" : "🤍 Adauga la favorite!"}
              </button>
              {details.strYoutube && (
                <a
                  className="btn-yt"
                  href={details.strYoutube}
                  target="_blank"
                  rel="noreferrer"
                >
                  Vezi reteta video
                </a>
              )}
            </div>
          </div>

          <div className="detail-body">
            <div className="detail-ingredients">
              <h3>Ingrediente</h3>
              <ul>
                {ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
            <div className="detail-instructions">
              <h3>Instructiuni</h3>
              {details.strInstructions
                .split("\r\n")
                .filter(Boolean)
                .map((step, i) => (
                  <p key={i}>{step}</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
