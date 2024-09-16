import React, { useRef, useState } from "react";
import "../CSS/MainStyle.css";

const VideoPlayer = ({ videoSrc, thumbnail }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changeVolume = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="video-player">
      <video
        ref={videoRef}
        src={videoSrc}
        poster={thumbnail}
        onClick={togglePlayPause}
        className="video-element"
      ></video>
      <div className="controls">
        <button onClick={togglePlayPause} className="play-pause-btn">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={toggleMute} className="mute-btn">
          {isMuted ? "Unmute" : "Mute"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={changeVolume}
          className="volume-slider"
        />
        <button onClick={toggleFullscreen} className="fullscreen-btn">
          Fullscreen
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
