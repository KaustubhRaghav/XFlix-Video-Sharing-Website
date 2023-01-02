import "../css/GenrePanel.css";

function GenrePanel({
  genreArr,
  contentRatingArr,
  handleGenreChange,
  handleContentRatingChange,
  sortValue,
  handleSortValue,
}) {
  return (
    <div className="genre-panel-container d-flex justify-content-center align-items-center">
      <div className="genre-panel-sub-container py-3 d-flex justify-content-center align-items-start">
        <div className="filter-container d-flex flex-column align-items-start">
          <div className="genres d-flex justify-content-center align-items-center flex-wrap">
            {genreArr.map((genre) => (
              <div className="pe-5" key={genre.id}>
                <div
                  className={`${
                    genre.isSelected
                      ? "selected-text-style"
                      : "default-text-style"
                  }`}
                  onClick={() => handleGenreChange(genre.value)}
                >
                  {genre.value}
                </div>
              </div>
            ))}
          </div>
          <div className="content-rating d-flex justify-content-center align-items-center flex-wrap">
            {contentRatingArr.map((contentRating) => (
              <div className="pe-5 pt-3" key={contentRating.id}>
                <div
                  className={`${
                    contentRating.isSelected
                      ? "selected-text-style"
                      : "default-text-style"
                  }`}
                  onClick={() => handleContentRatingChange(contentRating.value)}
                >
                  {contentRating.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sort-container">
          <div className="dropdown">
            <button
              className="dropdown-button"
              type="button"
              id="sortDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-arrow-down-up-across-line me-3"></i>
              <span>Sort By: </span>
              {sortValue}
            </button>
            <ul className="dropdown-menu" aria-labelledby="sortDropdown">
              <li onClick={() => handleSortValue("Release Date")} className="sort-option">Release Date</li>
              <li onClick={() => handleSortValue("View Count")} className="sort-option">View Count</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenrePanel;
