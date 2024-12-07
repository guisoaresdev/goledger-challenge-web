import { useState, useEffect } from "react";
import { albumController } from "./controllers/album.controller";
import "./Dashboard.css";

// TODO:
// 1. Implementar todas as funcionalidades primeiro.
// 2. Criar um controllador pra separar as chamadas de API da VIEW.
// 3. Deixar bonito.

function Dashboard() {
  const [albums, setAlbums] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [input, setInput] = useState({
    albumTitle: "",
    artistName: "",
    artistCountry: "",
    albumYear: "",
  });

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const fetchedAlbums = await albumController.getAlbums();
        setAlbums(fetchedAlbums);
      } catch (err) {
        console.log(`erro inesperado ao buscar os albums: ${err.message}`);
      }
    };

    fetchAlbums();
  }, [triggerUpdate]); // Dependência para reexecutar quando o estado for alterado

  const deleteAlbum = async (albumId: string) => {
    try {
      await albumController.removeAlbum(albumId);
      setTriggerUpdate(!triggerUpdate); // Atualiza a lista após remover
    } catch (err) {
      console.log(`erro inesperado ao remover o álbum: ${err.message}`);
    }
  };

  const addAlbum = async () => {
    try {
      await albumController.addAlbum(input);
      setTriggerUpdate(!triggerUpdate); // Atualiza a lista após adicionar
    } catch (err) {
      console.log(`erro inesperado ao adicionar o álbum: ${err.message}`);
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
      <div className="albums-view">
        <div className="album-prop">
          <h3>Album Title:</h3>
          <input
            type="text"
            name="albumTitle"
            value={input.albumTitle}
            onChange={handleChange}
            placeholder="Insira o nome do álbum"
          />
        </div>
        <div className="album-prop">
          <h3>Artist Name:</h3>
          <input
            type="text"
            name="artistName"
            value={input.artistName}
            onChange={handleChange}
            placeholder="Insira o nome do artista"
          />
        </div>
        <div className="album-prop">
          <h3>Artist Country:</h3>
          <input
            type="text"
            name="artistCountry"
            value={input.artistCountry}
            onChange={handleChange}
            placeholder="Insira o país de origem do artista"
          />
        </div>
        <div className="album-prop">
          <h3>Year:</h3>
          <input
            type="number"
            name="albumYear"
            value={input.albumYear}
            onChange={handleChange}
            placeholder="Insira o ano de publicação do álbum"
          />
        </div>
        <button className="new-album-btn" onClick={addAlbum}>
          Adicionar novo álbum
        </button>
        <ul className="lista-album">
          {albums.map((album, index) => (
            <li key={index}>
              {album.name} - {album.artist.name} ({album.year})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Dashboard;
