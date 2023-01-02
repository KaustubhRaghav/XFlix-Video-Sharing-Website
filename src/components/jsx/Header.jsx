import "../css/Header.css";
import { Link } from "react-router-dom";

function Header({ searchText, setSearchText, fromHomePage, setIsVideoUploadModalOpen }) {
  const handleSearchInput = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="header-container d-flex justify-content-between align-items-start">
      <Link to="/" className="text-decoration-none">
        <div className="logo">
          <h3>
            <span className="logo-x">X</span>
            <span className="logo-flix">Flix</span>
          </h3>
        </div>
      </Link>

      {fromHomePage && (
        <>
          <div className="input-group">
            <input
              type="search"
              className="form-control form-control-sm"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-icon"
              autoFocus
              value={searchText}
              onChange={handleSearchInput}
            />
            <span className="input-group-text" id="search-icon">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm upload-button"
            onClick={() => setIsVideoUploadModalOpen(true)}
          >
            <i className="fa-solid fa-upload me-2"></i>
            <span>Upload</span>
          </button>
        </>
      )}
    </div>
  );
}

export default Header;
