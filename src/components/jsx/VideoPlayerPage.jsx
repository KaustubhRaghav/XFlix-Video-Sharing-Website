/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import VideoPlayer from "./VideoPlayer";
import Dashboard from "./Dashboard";
import axios from "axios";
import { BASEURL } from "../../baseURL";

function VideoPlayerPage() {
  let { id } = useParams();

  const [videoArr, setVideoArr] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getVideos();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getSelectedVideoData();
  }, []);

  useEffect(() => {
    if (Object.values(selectedVideo).length > 0) {
      incrementViewCount();
    }
  }, [selectedVideo]);

  const getVideos = async () => {
    try {
      let response = await axios.get(`${BASEURL}/v1/videos`);
      setVideoArr(response.data.videos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelectedVideoData = async () => {
    try {
      let response = await axios.get(
        `${BASEURL}/v1/videos/60331f421f1d093ab5424489`
      );
      setSelectedVideo(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementViewCount = async () => {
    try {
      let response = await axios.patch(
        `${BASEURL}/v1/videos/60331f421f1d093ab5424489/views`,
        { viewCount: selectedVideo.viewCount + 1 }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpVoteButton = async () => {
    try {
      let response = await axios.patch(
        `${BASEURL}/v1/videos/60331f421f1d093ab5424489/votes`,
        { upVotes: selectedVideo.votes.upVotes + 1 }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownVoteButton = async () => {
    try {
      let response = await axios.patch(
        `${BASEURL}/v1/videos/60331f421f1d093ab5424489/votes`,
        { downVotes: selectedVideo.votes.downVotes - 1 }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <VideoPlayer
        selectedVideoData={selectedVideo}
        isLoading={isLoading}
        handleUpVoteButton={handleUpVoteButton}
        handleDownVoteButton={handleDownVoteButton}
      />
      <Dashboard videoArr={videoArr} isLoading={isLoading} />
    </div>
  );
}

export default VideoPlayerPage;
