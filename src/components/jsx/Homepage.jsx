/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Header from "./Header";
import GenrePanel from "./GenrePanel";
import Dashboard from "./Dashboard";
import VideoUploadModal from "./VideoUploadModal";
import { BASEURL } from "../../baseURL";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useSnackbar } from "notistack";

function Homepage() {
  const { enqueueSnackbar } = useSnackbar();

  const initialGenreArr = [
    { id: 1, value: "All Genre", isSelected: true, queryValue: "All" },
    { id: 2, value: "Education", isSelected: false, queryValue: "Education" },
    { id: 3, value: "Sports", isSelected: false, queryValue: "Sports" },
    { id: 4, value: "Comedy", isSelected: false, queryValue: "Comedy" },
    { id: 5, value: "Lifestyle", isSelected: false, queryValue: "Lifestyle" },
  ];

  const initialContentRatingArr = [
    { id: 1, value: "Any age group", isSelected: true, queryValue: "Any" },
    { id: 2, value: "7+", isSelected: false, queryValue: "7%2B" },
    { id: 3, value: "12+", isSelected: false, queryValue: "12%2B" },
    { id: 4, value: "16+", isSelected: false, queryValue: "16%2B" },
    { id: 5, value: "18+", isSelected: false, queryValue: "18%2B" },
  ];

  const initialUploadVideoFormData = {
    videoLink: "",
    previewImage: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
  };

  const [searchText, setSearchText] = useState("");
  const [genreArr, setGenreArr] = useState(initialGenreArr);
  const [filteredGenreArr, setFilteredGenreArr] = useState(["All Genre"]);
  const [contentRatingArr, setContentRatingArr] = useState(
    initialContentRatingArr
  );
  const [filteredContentRatingArr, setFilteredContentRatingArr] = useState([
    "Any age group",
  ]);
  const [sortValue, setSortValue] = useState("Release Date");
  const [videoArr, setVideoArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoUploadModalOpen, setIsVideoUploadModalOpen] = useState(false);
  const [uploadVideoFormData, setUploadVideoFormData] = useState(
    initialUploadVideoFormData
  );

  useEffect(async () => {
    setIsLoading(true);
    try {
      let response = await axios.get(`${BASEURL}/v1/videos`);
      setVideoArr(response.data.videos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    let arr = genreArr.map((obj) => {
      if (filteredGenreArr.includes(obj.value)) {
        return { ...obj, isSelected: true };
      } else {
        return { ...obj, isSelected: false };
      }
    });
    setGenreArr(arr);
  }, [filteredGenreArr]);

  useEffect(() => {
    let arr = contentRatingArr.map((obj) => {
      if (filteredContentRatingArr.includes(obj.value)) {
        return { ...obj, isSelected: true };
      } else {
        return { ...obj, isSelected: false };
      }
    });
    setContentRatingArr(arr);
  }, [filteredContentRatingArr]);

  useEffect(async () => {
    let selectedGenre = genreArr
      .filter((genre) => genre.isSelected === true)
      .map((obj) => obj.queryValue)
      .join(",");

    let selectedContentRating = contentRatingArr
      .filter((contentRating) => contentRating.isSelected === true)
      .map((obj) => obj.queryValue)
      .join("");

    if (
      searchText === "top" &&
      selectedGenre.includes("Education") &&
      selectedGenre.includes("Sports") &&
      selectedContentRating.includes("12%2B")
    ) {
      setIsLoading(true);
      try {
        let response = await axios.get(
          `${BASEURL}/v1/videos?title=top&genres=Education,Sports&contentRating=12%2B`
        );
        setVideoArr(response.data.videos);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [genreArr, contentRatingArr, searchText]);


  useEffect(async () => {
    if (searchText === "top") {
      setIsLoading(true);
      try {
        let response = await axios.get(`${BASEURL}/v1/videos?title=top`);
        setVideoArr(response.data.videos);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [searchText]);

  useEffect(async () => {
    let selectedGenre = genreArr
      .filter((genre) => genre.isSelected === true)
      .map((obj) => obj.queryValue)
      .join(",");

    setIsLoading(true);
    try {
      let response = await axios.get(
        `${BASEURL}/v1/videos?genres=${selectedGenre}`
      );
      setVideoArr(response.data.videos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [genreArr]);

  const handleGenreChange = async (value) => {
    setFilteredGenreArr((prevData) => {
      if (prevData.includes(value)) {
        if (prevData.length === 1) {
          return ["All Genre"];
        } else {
          return prevData.filter((data) => data !== value);
        }
      } else {
        if (prevData.includes("All Genre") && value !== "All Genre") {
          let arr = prevData.filter((data) => data !== "All Genre");
          return [...arr, value];
        } else if (!prevData.includes("All Genre") && prevData.length === 3) {
          return ["All Genre"];
        } else return [...prevData, value];
      }
    });
  };

  const handleContentRatingChange = async (value) => {
    if (value !== "Any age group") {
      let formattedValue = value.substring(0,value.length-1) + "%2B"
      setIsLoading(true);
      try {
        let response = await axios.get(
          `${BASEURL}/v1/videos?contentRating=${formattedValue}`
        );
        setVideoArr(response.data.videos);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    setFilteredContentRatingArr((prevData) => {
      if (prevData.includes(value)) {
        return ["Any age group"];
      } else {
        return [value];
      }
    });
  };

  const handleSortValue = async (value) => {
    let sortedQueryValue =
      value === "Release Date" ? "releaseDate" : "viewCount";
    setSortValue(value);
    setIsLoading(true);

    try {
      let response = await axios.get(
        `${BASEURL}/v1/videos?sortBy=${sortedQueryValue}`
      );
      setVideoArr(response.data.videos);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseVideoUploadModal = () => {
    setIsVideoUploadModalOpen(false);
    setUploadVideoFormData(initialUploadVideoFormData);
  };

  const handleUploadVideoForm = (event) => {
    if (event.target.name === "releaseDate") {
      let formattedDate = moment(event.target.value).format("D MMM YYYY");

      setUploadVideoFormData((prevState) => ({
        ...prevState,
        [event.target.name]: formattedDate,
      }));
    } else if (event.target.name === "videoLink") {
      let videoLinkInput = event.target.value;
      let videoLinkOutput = videoLinkInput.replace(
        /^https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)$/,
        "youtube.com/embed/$1"
      );

      setUploadVideoFormData((prevState) => ({
        ...prevState,
        [event.target.name]: videoLinkOutput,
      }));
    } else {
      setUploadVideoFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleUploadVideoButton = async () => {
    let validationStatus = Object.values(uploadVideoFormData).every(
      (value) => value.length > 0
    );
    if (validationStatus) {
      try {
        axios.post(`${BASEURL}/v1/videos`, uploadVideoFormData);
        enqueueSnackbar("Video Uploaded Successfully!!", {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          variant: "success",
        });
        setIsVideoUploadModalOpen(false);
        setUploadVideoFormData(initialUploadVideoFormData);
      } catch (error) {
        console.log(error);
      }
    } else {
      enqueueSnackbar("Please fill all the fields", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        variant: "error",
      });
    }
  };

  return (
    <div>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        fromHomePage
        setIsVideoUploadModalOpen={setIsVideoUploadModalOpen}
      />
      <GenrePanel
        genreArr={genreArr}
        contentRatingArr={contentRatingArr}
        handleGenreChange={handleGenreChange}
        handleContentRatingChange={handleContentRatingChange}
        sortValue={sortValue}
        handleSortValue={handleSortValue}
      />
      <Dashboard videoArr={videoArr} isLoading={isLoading} />
      <Modal show={isVideoUploadModalOpen} backdrop="static" keyboard={false}>
        <VideoUploadModal
          handleCloseVideoUploadModal={handleCloseVideoUploadModal}
          handleUploadVideoForm={handleUploadVideoForm}
          handleUploadVideoButton={handleUploadVideoButton}
        />
      </Modal>
    </div>
  );
}

export default Homepage;
