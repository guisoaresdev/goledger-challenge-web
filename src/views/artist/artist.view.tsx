import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { artistController } from "../../controllers/artist.controller";
import "./artist.view.css";

function ArtistView() {
  const [artists, setArtists] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [input, setInput] = useState({
    artistName: "",
    artistCountry: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const fetchedArtists = await artistController.getArtists();
        setArtists(fetchedArtists);
      } catch (err) {
        console.log(`erro inesperado ao buscar os artistas: ${err.message}`);
      }
    };

    fetchArtists();
  }, [triggerUpdate]); // Dependência para reexecutar quando o estado for alterado

  const deleteArtist = async (artistId: string) => {
    try {
      await artistController.removeArtist(artistId);
      setTriggerUpdate(!triggerUpdate); // Atualiza a lista após remover
    } catch (err) {
      console.log(`erro inesperado ao remover o artista: ${err.message}`);
    }
  };

  const addArtist = async () => {
    try {
      await artistController.addArtist(input);
      setTriggerUpdate(!triggerUpdate); // Atualiza a lista após adicionar
    } catch (err) {
      console.log(`erro inesperado ao adicionar o artista: ${err.message}`);
    }
  };

  const handleArtistClick = (artistId) => {
    navigate(`/artist/${artistId}/albums`);
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
      <div className="artists-view">
        <div className="artist-prop">
          <h3>Artist Name:</h3>
          <input
            type="text"
            name="artistName"
            value={input.artistName}
            onChange={handleChange}
            placeholder="Insira o nome do artista"
          />
        </div>
        <div className="artist-prop">
          <h3>Artist Country:</h3>
          <input
            type="text"
            name="artistCountry"
            value={input.artistCountry}
            onChange={handleChange}
            placeholder="Insira o país de origem do artista"
          />
        </div>
        <button className="new-artist-btn" onClick={addArtist}>
          Adicionar novo artista
        </button>
        <ul className="lista-artistas">
          {artists.map((artist, index) => (
            <li key={index} onClick={() => handleArtistClick(artist["@key"])}>
              {artist.name} - {artist.country}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ArtistView;
