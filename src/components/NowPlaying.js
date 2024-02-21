// NowPlaying.js
import React from 'react';

function NowPlaying({ track }) {
  return (
    <div>
      <h2>Now Playing</h2>
      {track && <p>{track.name}</p>}
    </div>
  );
}

export default NowPlaying;
