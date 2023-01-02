import "../css/VideoUploadModal.css";
import moment from "moment";

function VideoUploadModal({
  handleCloseVideoUploadModal,
  handleUploadVideoForm,
  handleUploadVideoButton,
}) {
  const currentDate = moment(new Date()).format("YYYY-MM-DD");

  return (
    <div className="video-upload-modal-container p-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="upload-video-title">Upload Video</div>
        <i
          onClick={handleCloseVideoUploadModal}
          className="fa-solid fa-xmark cross-icon"
        ></i>
      </div>

      <form>
        <div className="form-floating mt-4">
          <input
            type="url"
            className="form-control form-input-style"
            id="videoLink"
            placeholder="Video Link"
            autoFocus
            name="videoLink"
            autoComplete="off"
            onChange={handleUploadVideoForm}
          />
          <label htmlFor="videoLink" className="form-label-style">
            Video Link
          </label>
        </div>
        <div className="form-subtext-style pt-1 ps-2">
          This link will be used to derive the video
        </div>

        <div className="form-floating mt-3">
          <input
            type="url"
            className="form-control form-input-style"
            id="previewImage"
            placeholder="Thumbnail Image Link"
            name="previewImage"
            autoComplete="off"
            onChange={handleUploadVideoForm}
          />
          <label htmlFor="previewImage" className="form-label-style">
            Thumbnail Image Link
          </label>
        </div>
        <div className="form-subtext-style pt-1 ps-2">
          This link will be used to preview the thumbnail image
        </div>

        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control form-input-style"
            id="title"
            placeholder="Title"
            name="title"
            autoComplete="off"
            onChange={handleUploadVideoForm}
          />
          <label htmlFor="title" className="form-label-style">
            Title
          </label>
        </div>
        <div className="form-subtext-style pt-1 ps-2">
          The title will be the representative text for video
        </div>

        <div className="form-floating mt-3">
          <select
            className="form-select form-input-style"
            id="genre"
            aria-label="genre-select"
            name="genre"
            onChange={handleUploadVideoForm}
          >
            <option className="select-option-style" value="">
              ----Select Genre----
            </option>
            <option className="select-option-style" value="All">
              All Genre
            </option>
            <option className="select-option-style" value="Education">
              Education
            </option>
            <option className="select-option-style" value="Sports">
              Sports
            </option>
            <option className="select-option-style" value="Comedy">
              Comedy
            </option>
            <option className="select-option-style" value="Lifestyle">
              Lifestyle
            </option>
          </select>
          <label htmlFor="genre" className="form-label-style">
            Genre
          </label>
        </div>
        <div className="form-subtext-style pt-1 ps-2">
          Genre will help in categorizing your videos
        </div>

        <div className="form-floating mt-3">
          <select
            className="form-select form-input-style"
            id="contentRating"
            aria-label="content-rating-select"
            name="contentRating"
            onChange={handleUploadVideoForm}
          >
            <option className="select-option-style" value="">
              ----Select Age Group----
            </option>
            <option className="select-option-style" value="Any">
              Any age group
            </option>
            <option className="select-option-style" value="7+">
              7+
            </option>
            <option className="select-option-style" value="12+">
              12+
            </option>
            <option className="select-option-style" value="16+">
              16+
            </option>
            <option className="select-option-style" value="18+">
              18+
            </option>
          </select>
          <label htmlFor="contentRating" className="form-label-style">
            Suitable age group for the clip
          </label>
        </div>
        <div className="form-subtext-style pt-1 ps-2">
          This will be used to filter videos on age group suitability
        </div>

        <div className="form-floating mt-3">
          <input
            type="date"
            className="form-control form-input-style"
            id="releaseDate"
            placeholder="Upload and Publish Date"
            name="releaseDate"
            autoComplete="off"
            min={currentDate}
            onChange={handleUploadVideoForm}
          />
          <label htmlFor="releaseDate" className="form-label-style">
            Upload and Publish Date
          </label>
        </div>
        <div className="form-subtext-style pt-1 ps-2">
          This will be used to sort videos
        </div>
      </form>
      <div className="d-flex mt-4">
        <button
          type="button"
          className="upload-video-button me-3"
          onClick={handleUploadVideoButton}
        >
          UPLOAD VIDEO
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={handleCloseVideoUploadModal}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default VideoUploadModal;
