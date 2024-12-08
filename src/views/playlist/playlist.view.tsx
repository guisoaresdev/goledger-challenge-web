import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { playlistController } from "../../controllers/playlist.controller";
import "./playlist.view.css";

function PlaylistView() {
  const { playlistId } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [input, setInput] = useState({
    playlistTitle: "",
    artistName: "",
    artistCountry: "",
    playlistYear: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const fetchedPlaylists =
          await playlistController.getPlaylists(playlistId);
        setPlaylists(fetchedPlaylists);
      } catch (err) {
        console.log(`erro inesperado ao buscar os playlists: ${err.message}`);
      }
    };

    fetchPlaylists();
  }, [playlistId, triggerUpdate]); // Dependência para reexecutar quando o estado for alterado

  const deletePlaylist = async (playlistId: string) => {
    try {
      await playlistController.removePlaylist(playlistId);
      setTriggerUpdate(!triggerUpdate); // Atualiza a lista após remover
    } catch (err) {
      console.log(`erro inesperado ao remover o álbum: ${err.message}`);
    }
  };

  const addPlaylist = async () => {
    try {
      await playlistController.addPlaylist(input);
      setTriggerUpdate(!triggerUpdate); // Atualiza a lista após adicionar
    } catch (err) {
      console.log(`erro inesperado ao adicionar o álbum: ${err.message}`);
    }
  };

  const handlePlaylistClick = (playlistId) => {
    navigate(`/playlist/${playlistId}/songs`);
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
      <div className="playlists-view">
        <div className="playlist-prop">
          <h3>Playlist Title:</h3>
          <input
            type="text"
            name="playlistTitle"
            value={input.playlistTitle}
            onChange={handleChange}
            placeholder="Insira o nome do álbum"
          />
        </div>
        <div className="playlist-prop">
          <h3>Artist Name:</h3>
          <input
            type="text"
            name="artistName"
            value={input.artistName}
            onChange={handleChange}
            placeholder="Insira o nome do artista"
          />
        </div>
        <div className="playlist-prop">
          <h3>Artist Country:</h3>
          <input
            type="text"
            name="artistCountry"
            value={input.artistCountry}
            onChange={handleChange}
            placeholder="Insira o país de origem do artista"
          />
        </div>
        <div className="playlist-prop">
          <h3>Year:</h3>
          <input
            type="number"
            name="playlistYear"
            value={input.playlistYear}
            onChange={handleChange}
            placeholder="Insira o ano de publicação do álbum"
          />
        </div>
        <button className="new-playlist-btn" onClick={addPlaylist}>
          Adicionar novo álbum
        </button>
        <ul className="lista-playlist">
          {playlists.map((playlist, index) => (
            <li
              key={index}
              onClick={() => handlePlaylistClick(playlist["@key"])}
            >
              {playlist.name} - {playlist.artist.name} ({playlist.year})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default PlaylistView;
