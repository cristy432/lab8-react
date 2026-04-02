# Crearea unei Aplicații de Explorare a Datelor dintr-un API Public cu React

## Cerințe Generale

### Configurare Proiect
- Creează un proiect `React` folosind `Vite`.
- Aplicația trebuie să consume date dintr-un **API public REST** (e.g., muzee, filme, cărți, animale, spațiu, vreme, sport, mâncare etc.).

### Tematica
- **Fiecare student își alege propria tematică** și un API public corespunzător. Tematica trebuie să fie unică și suficient de complexă pentru a acoperi toate cerințele tehnice de mai jos.
- Exemple orientative de API-uri: [PokeAPI](https://pokeapi.co/), [Open Library API](https://openlibrary.org/developers/api), [The Movie Database API](https://www.themoviedb.org/documentation/api), [REST Countries](https://restcountries.com/), [NASA API](https://api.nasa.gov/), [TheMealDB](https://www.themealdb.com/api.php), [Art Institute of Chicago API](https://api.artic.edu/docs/) etc.

### Interfață Utilizator (UI) & Experiență
- Stilizarea se poate face cu CSS pur / CSS Modules sau biblioteci externe (e.g., Tailwind, Material-UI).
- Interfața trebuie să fie funcțională și plăcută vizual.

---

## Funcționalități

### 1. Căutare și Filtrare

- Implementează un **câmp de căutare** care trimite cereri către API și afișează rezultatele.
- Implementează **cel puțin un filtru** suplimentar (e.g., categorie, tip, departament, gen, an etc.) care restrânge rezultatele căutării.
- Căutarea și filtrele trebuie să funcționeze **împreună** (combinat).
- Atunci când utilizatorul modifică filtrele sau caută din nou, rezultatele se actualizează corespunzător.

### 2. Afișarea Rezultatelor cu Paginare

- Rezultatele căutării se afișează sub formă de **card-uri** (grid sau listă), fiecare card prezentând informații de bază (imagine, titlu, descriere scurtă).
- Implementează un mecanism de **paginare** (butoane Prev/Next sau încărcare incrementală) pentru navigarea prin volumul mare de rezultate.
- Afișează informații despre starea curentă: numărul total de rezultate, pagina curentă etc.

### 3. Vizualizare Detaliată

- La click pe un card, se deschide o **vizualizare detaliată** care afișează informații extinse despre elementul selectat.
- Pagina de detalii solicită date suplimentare de la API (nu doar datele din card).
- Include un buton de **întoarcere** la lista de rezultate, care restaurează starea anterioară (pagina, căutarea).

### 4. Sistem de Favorite cu Persistență Locală

- Utilizatorul poate **adăuga/elimina elemente din favorite**.
- Favoritele se stochează în **`localStorage`** și persistă între sesiuni.
- Implementează o **pagină/secțiune separată** "Favorites" unde utilizatorul poate vedea toate elementele salvate.
- Starea de favorit se reflectă vizual pe card-uri.

### 5. Custom Hooks

- Creează **cel puțin 2 custom hooks** relevante pentru aplicație:

| Hook | Responsabilitate |
|------|-----------------|
| `useFetch` (sau similar) | Gestionează ciclul complet al unui request HTTP: `data`, `loading`, `error`. Suportă schimbarea URL-ului și curățarea cererilor (abort). |
| `useFavorites` (sau similar) | Încapsulează logica de adăugare, ștergere, verificare și persistare a favoritelor (`localStorage`). |

- Hooks-urile trebuie să fie **reutilizabile** — să nu depindă de un singur component.

### 6. Caching de Date

- Implementează un **mecanism de caching** (în memorie sau `sessionStorage`) pentru răspunsurile API deja primite.
- Dacă utilizatorul navighează la un element vizitat anterior, datele se încarcă **instant** din cache, fără o nouă cerere HTTP.
- Cache-ul trebuie să aibă un **TTL (Time-To-Live)** — după o perioadă, datele se invalidează și se preiau din nou de la API.

### 7. Gestionarea Stărilor de Încărcare și Eroare

- Fiecare cerere HTTP trebuie să gestioneze 3 stări: **loading**, **success**, **error**.
- Afișează **indicatori de încărcare** în timpul cererilor.
- Afișează **mesaje de eroare** clare dacă cererea eșuează.
- Gestionează corect **starea inițială**  când nu deținem informații din API, mesaj de bun-venit sau instrucțiuni când nu există rezultate.

---

## Barem de notare

| Punctaj | Sarcina |
|---------|---------|
| 1 | Crearea corectă a proiectului (Vite + React) și structura fișierelor |
| 1 | Integrare funcțională cu un API public (căutare, cereri HTTP corecte) |
| 1 | UI plăcut și funcțional (stilizare coerentă, responsive minimal) |
| 1 | Afișare rezultate sub formă de card-uri cu paginare |
| 1 | Filtrare (minim 1 filtru suplimentar combinat cu căutarea) |
| 1 | Vizualizare detaliată cu date suplimentare de la API |
| 1 | Sistem de favorite cu persistență în `localStorage` |
| 1 | Custom hook-uri reutilizabile (`useFetch`, `useFavorites` sau echivalente) |
| 1 | Caching de date cu TTL |
| 1 | Gestionarea corectă a stărilor: loading, error, empty state |

### Link de exemplu de soluție: [The Met Gallery](https://lab8-react-example.vercel.app/)

## !! BAREM-UL DE MAI SUS ESTE PENTRU VERIFICAREA INIȚIALĂ A LABORATORULUI — LA ÎNCĂRCAREA ACESTUIA PE GITHUB. NOTA FINALĂ POATE FI MODIFICATĂ ÎN DEPENDENȚA APĂRĂRII LABORATORULUI ÎN CADRUL ORELOR !!

## !! NU SE ACCEPTĂ ÎNTÂRZIERI !!
