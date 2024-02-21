import React, { useState, useEffect, useRef } from 'react';
import AudioPlayer from './components/AudioPlayer';
import { Playlist } from './components/Playlist';
import './App.css';

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  // Load playlist from local storage on component mount
  useEffect(() => {
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(savedPlaylist);
    
    // Load last playing audio file and continue playing from the last position
    const lastPlayingTrackIndex = parseInt(localStorage.getItem('lastPlayingTrackIndex'), 10);
    if (!isNaN(lastPlayingTrackIndex) && lastPlayingTrackIndex < savedPlaylist.length) {
      setCurrentTrackIndex(lastPlayingTrackIndex);
    }
  }, []);

  // Save playlist and last playing track index to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('lastPlayingTrackIndex', currentTrackIndex);
  }, [playlist, currentTrackIndex]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const updatedPlaylist = [...playlist];
    for (let i = 0; i < files.length; i++) {
      updatedPlaylist.push(files[i]);
    }
    setPlaylist(updatedPlaylist);
    
    // Reset current track index to the newly added song
    setCurrentTrackIndex(updatedPlaylist.length - files.length);
  };

  // Handle track end
  const handleTrackEnd = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  // Handle track selection from playlist
  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="App">
      <h1>Add to direct Playlist</h1>
      <input type="file" accept=".mp3" multiple onChange={handleFileUpload} />
      <Playlist playlist={playlist} currentTrackIndex={currentTrackIndex} onTrackSelect={handleTrackSelect} />
      {playlist.length > 0 && (
        <AudioPlayer
          ref={audioRef}
          playlist={playlist}
          currentTrackIndex={currentTrackIndex}
          setCurrentTrackIndex={setCurrentTrackIndex}
          onEnded={handleTrackEnd}
        />
      )}
    </div>
  );
}

export default App;
