import React from 'react';

const Playlist = ({ playlist, currentTrackIndex, onTrackSelect }) => {
  const handleTrackClick = (index) => {
    onTrackSelect(index);
  };

  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li key={index} className={index === currentTrackIndex ? 'active' : ''} onClick={() => handleTrackClick(index)}>
            {track.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
function Playsong({ playlist, currentTrackIndex, onTrackSelect, onPlay }) {
  const handleClick = (index) => {
    onTrackSelect(index); 
    onPlay(index); 
  };

  return (
    <div className="playlist">
      <h2>Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li
            key={index}
            className={index === currentTrackIndex ? 'active' : ''}
            
            onClick={() => handleClick(index)} 
          >
            {track.name}
          </li>
        ))}
      </ul>
    </div>
  );
}


export { Playlist, Playsong };