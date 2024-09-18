import React, { useState } from 'react';
import axios from 'axios';

const MusicPlayer = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');

  const fetchSongs = async (searchQuery) => {
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/infos ',
      params: { q: searchQuery },
      headers: {
        'X-RapidAPI-Key': 'd63942416cmsh8835f972ab220c0p1a8baejsn68a79b3b0dfe', 
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
      },
    };

   

    try {
      const response = await axios.request(options);
      setSongs(response.data.data);
      setError('');
    } catch (error) {
      setError('Error fetching songs: ' + error.message);
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      fetchSongs(e.target.value);
    } else {
      setSongs([]);
    }
  };

  return (
    <div>
      <h1>Music Player</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for songs..."
        style={{ padding: '5px', borderColor: 'orange' }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {songs.length > 0 ? (
          songs.map((song) => (
            <li key={song.id}>
              {song.title} - {song.artist.name}
            </li>
          ))
        ) : (
          <p>No songs found</p>
        )}
      </ul>
    </div>
  );
};

export default MusicPlayer;
