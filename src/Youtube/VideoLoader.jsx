import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import YouTubePlayer from './YoutubePlayer';
import './VideoLoader.css';

const VideoLoader = () => {
  const { videoId: paramVideoId } = useParams();
  const [videoId, setVideoId] = useState(paramVideoId || "");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&|\n|\r]+)|youtu\.be\/([^&|\n|\r]+)/;
    const matches = url.match(regex);
    return matches ? matches[1] || matches[2] : "";
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleLoadVideo = () => {
    const extractedId = extractVideoId(inputValue);
    if (extractedId) {
      setVideoId(extractedId);
      navigate(`/video/${extractedId}`); // Navigate to new video URL
    } else {
      alert("Invalid YouTube URL");
    }
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  useEffect(() => {
    if (paramVideoId) {
      setVideoId(paramVideoId);
      setInputValue(`https://www.youtube.com/watch?v=${paramVideoId}`); // Pre-fill input with the current video URL
    }
  }, [paramVideoId]);

  return (
    <div className="video-loader">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Paste YouTube link here"
        className="video-input"
      />
      <div className="button-container">
        <button onClick={handleLoadVideo} className="button load-button">
          Load Video
        </button>
        <button onClick={handleClearInput} className="button clear-button">
          Clear
        </button>
      </div>
      {videoId && <YouTubePlayer videoId={videoId} />}
    </div>
  );
};

export default VideoLoader;
