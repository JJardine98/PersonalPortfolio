import React from "react";
import YouTube from "react-youtube";
import "../CSS/MainStyle.css";

const YouTubePlayer = ({ videoId }) => {
  const onReady = (event) => {
    // Optional: You can handle the player ready event here if needed
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
      controls: 1, // Ensures the built-in controls are visible
    },
  };

  return (
    <div className="youtube-player">
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
      />
    </div>
  );
};

export default YouTubePlayer;
