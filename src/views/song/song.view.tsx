import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { songController } from "../../controllers/song.controller";
import { albumController } from "../../controllers/album.controller";
import "./song.view.css";

function SongView() {
  const { albumId } = useParams();
  const [songs, setSongs] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [input, setInput] = useState({
    songName: "",
    albumName: "",
    artistName: "",
    artistCountry: "",
    albumYear: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const fetchedSongs = await albumController.getSongsByAlbum(albumId);
        setSongs(fetchedSongs);
      } catch (err) {
        console.log(`erro inesperado ao buscar as musicas: ${err.message}`);
      }
    };

    fetchSongs();
  }, [albumId, triggerUpdate]);

  const deleteSong = async (songId: string) => {
    try {
      const response = await songController.removeSong(songId);
      setTriggerUpdate(!triggerUpdate);
    } catch (err) {
      console.log(`erro inesperado ao remover a musica: ${err.message}`);
    }
  };

  const addSong = async () => {
    try {
      const response = await songController.addSong(input);
      setTriggerUpdate(!triggerUpdate);
    } catch (err) {
      console.log(`erro inesperado ao adicionar a musica: ${err.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <>
      <div className="header">
        <h3> Bem-vindo! </h3>
      </div>
      <div className="song-view">
        <div className="song-prop">
          <h3>Song Name:</h3>
          <input
            type="text"
            name="artistName"
            value={input.songName}
            onChange={handleChange}
            placeholder="Insira o nome do artista"
          />
        </div>
        <div className="song-prop">
          <h3>Album Name:</h3>
          <input
            type="text"
            name="artistCountry"
            value={input.artistCountry}
            onChange={handleChange}
            placeholder="Insira o país de origem do artista"
          />
        </div>
        <button className="new-song-btn" onClick={addSong}>
          Adicionar novo artista
        </button>
        <ul className="lista-sons">
          {songs.map((song, index) => (
            <li key={index}>{song.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SongView;
