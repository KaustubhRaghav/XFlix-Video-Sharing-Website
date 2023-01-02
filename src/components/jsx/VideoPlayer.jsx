import "../css/VideoPlayer.css";
import moment from "moment";

function VideoPlayer({
  selectedVideoData: {
    contentRating,
    genre,
    releaseDate,
    title,
    videoLink,
    viewCount,
    votes,
  },
  isLoading,
  handleUpVoteButton,
  handleDownVoteButton,
}) {
  const intlFormat = (num) => {
    return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
  };
  const abbreviateValue = (num) => {
    if (num >= 1000000) return intlFormat(num / 1000000) + "M";
    if (num >= 1000) return intlFormat(num / 1000) + "k";
    return intlFormat(num);
  };

  return (
    <div className="video-player-container">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container pt-3 pb-4 video-player-subcontainer">
          <div className="d-flex justify-content-center align-items-center video-player">
            <iframe
              src={`https://www.${videoLink}`}
              title={title}
              className="iframe-style"
              allow="fullscreen"
            ></iframe>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex flex-column justify-content-center align-items-start">
              <div className="video-player-title">{title}</div>
              <div>
                <span className="video-player-info">
                  {abbreviateValue(viewCount)} views
                </span>
                <span className="circle-badge ps-2">&#8226;</span>
                <span className="video-player-info ps-2">{genre}</span>
                <span className="circle-badge ps-2">&#8226;</span>
                <span className="video-player-info ps-2">{contentRating}</span>
                <span className="circle-badge ps-2">&#8226;</span>
                <span className="video-player-info ps-2">
                  {moment(new Date(releaseDate), "YYYYMMDD").fromNow()}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="btn btn-primary up-vote-button me-3 btn-sm"
                onClick={handleUpVoteButton}
              >
                <i className="fa-solid fa-thumbs-up me-2 up-thumbs-icon"></i>
                <span className="button-text">
                  {votes && abbreviateValue(votes.upVotes)}
                </span>
              </button>
              <button
                type="button"
                className="btn down-vote-button btn-sm"
                onClick={handleDownVoteButton}
              >
                <i className="fa-solid fa-thumbs-down me-2 down-thumbs-icon"></i>
                <span className="button-text">
                  {votes && abbreviateValue(votes.downVotes)}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
