import { useEffect, useRef, useState } from "react";
import {
  ArrowsRightLeftIcon,
  BackwardIcon,
  ForwardIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import music from "/music.jpg";
import music1 from "/music1.jpg";

function MusicPlayer() {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const tracks = [
    {
      title: "Summer Vibes",
      artist: "Chill Orchestra",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      image: music,
    },
    {
      title: "Mountain High",
      artist: "Nature Sounds",
      source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      image: music1,
    },
  ];

  useEffect(() => {
    const updateProgress = () => {
      const { currentTime, duration } = audioRef.current;
      setProgress((currentTime / duration) * 100 || 0);
      setCurrentTime(formatTime(currentTime));
      setDuration(formatTime(duration));
    };

    audioRef.current?.addEventListener("timeupdate", updateProgress);

    return () => {
      audioRef.current?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    audioRef.current.volume = volume;
    audioRef.current.loop = isLooping;
  }, [volume, isLooping]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const seekPosition = (e.clientX - rect.left) / rect.width;
    const newTime = seekPosition * audioRef.current.duration;

    // Update audio position immediately
    audioRef.current.currentTime = newTime;

    // Manually update progress and time display
    setProgress((newTime / audioRef.current.duration) * 100);
    setCurrentTime(formatTime(newTime));
  };

  const handleSkip = (direction) => {
    if (isShuffled && direction === "forward") {
      return setCurrentTrackIndex(Math.floor(Math.random() * tracks.length));
    }

    setCurrentTrackIndex((prev) => {
      if (direction === "forward") {
        return (prev + 1) % tracks.length;
      }
      return (prev - 1 + tracks.length) % tracks.length;
    });
    setIsPlaying(true);
  };

  const handleEnded = () => {
    if (!isLooping) handleSkip("forward");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col items-center space-y-6">
          {/* Album Art */}
          <div className="relative group">
            <img
              src={tracks[currentTrackIndex].image}
              alt="Album cover"
              className={`w-64 h-64 rounded-2xl object-cover shadow-lg ${
                isPlaying ? "animate-rotate-album" : ""
              }`}
            />
            <div className="absolute inset-0 bg-black/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="p-4 bg-white/20 rounded-full hover:bg-white/30 transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <PauseIcon className="w-8 h-8 text-white" />
                ) : (
                  <PlayIcon className="w-8 h-8 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              {tracks[currentTrackIndex].title}
            </h2>
            <p className="text-gray-300">{tracks[currentTrackIndex].artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <div
              ref={progressBarRef}
              onClick={handleSeek}
              className="h-2 bg-white/20 rounded-full cursor-pointer"
            >
              <div
                className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-300">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6 w-full">
            <button
              onClick={() => setIsShuffled(!isShuffled)}
              className={`p-2 cursor-pointer rounded-full ${
                isShuffled ? "text-blue-400" : "text-gray-300"
              } hover:text-white transition-colors`}
            >
              <ArrowPathIcon className="w-6 h-6" />
            </button>

            <button
              onClick={() => handleSkip("backward")}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <BackwardIcon className="w-6 h-6" />
            </button>

            <button
              onClick={handlePlayPause}
              className="p-4 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors text-white cursor-pointer"
            >
              {isPlaying ? (
                <PauseIcon className="w-8 h-8" />
              ) : (
                <PlayIcon className="w-8 h-8" />
              )}
            </button>

            <button
              onClick={() => handleSkip("forward")}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white cursor-pointer"
            >
              <ForwardIcon className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-2 cursor-pointer rounded-full ${
                isLooping ? "text-blue-400" : "text-gray-300"
              } hover:text-white transition-colors`}
            >
              <ArrowsRightLeftIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-4 w-full">
            <SpeakerWaveIcon className="w-5 h-5 text-gray-300" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <audio
          ref={audioRef}
          src={tracks[currentTrackIndex].source}
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
}

export default MusicPlayer;
