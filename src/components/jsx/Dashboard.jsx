import "../css/Dashboard.css";
import VideoCard from "../jsx/VideoCard";

function Dashboard({ videoArr, isLoading }) {
  return (
    <div className={`dashboard-container pt-3 ${videoArr.length <=4 ? "vh-100" : ""}`}>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            {videoArr.map(({ _id, title, previewImage, releaseDate }) => (
              <div key={_id} className="col-6 col-md-4 col-lg-3 pt-3 d-flex">
                <VideoCard
                  title={title}
                  previewImage={previewImage}
                  releaseDate={releaseDate}
                  id={_id}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
