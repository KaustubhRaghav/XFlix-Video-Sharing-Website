import "../css/VideoCard.css";
import moment from "moment";
import { Link } from "react-router-dom";

function VideoCard({ title, previewImage, releaseDate, id }) {
  return (
    <div className="card video-card-container">
      <img src={previewImage} className="card-img-top" alt={title} />
      <div className="card-body">
        <div className="video-title">{title}</div>
        <div className="video-release-date">
          {moment(new Date(releaseDate), "YYYYMMDD").fromNow()}
        </div>
        <Link className="stretched-link" to={`/video/${id}`}></Link>
      </div>
    </div>
  );
}

export default VideoCard;
