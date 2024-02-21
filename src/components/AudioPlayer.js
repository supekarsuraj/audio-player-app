import React, { useRef, useEffect, useState } from 'react';

function AudioPlayer({ playlist, currentTrackIndex, setCurrentTrackIndex }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Load last playing audio file and continue playing from the last position
    if (currentTrackIndex >= 0 && currentTrackIndex < playlist.length) {
      audioRef.current.src = URL.createObjectURL(playlist[currentTrackIndex]);
      audioRef.current.play();
    }
  }, [currentTrackIndex, playlist]);

  const playNextSong = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const playPreviousSong = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const handleAudioEnded = () => {
    playNextSong();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio
        ref={audioRef}
        controls
        onEnded={handleAudioEnded}
      />
<button className="previous-button" onClick={playPreviousSong}>Previous</button>
<button className="play-pause-button" onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button className="next-button" onClick={playNextSong}>Next</button>
    </div>
  );
}

export default AudioPlayer;
