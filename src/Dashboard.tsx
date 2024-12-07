import { useState, useEffect } from "react";
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
    fetchAlbums();
  }, [triggerUpdate]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/query/search",
        {
          method: "POST",
          headers: {
            Authorization: "Basic cHNBZG1pbjpnb2xlZGdlcg==",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: {
              selector: {
                "@assetType": "album",
              },
            },
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setAlbums(data.result); // Atualiza o estado com os álbuns.
      } else {
        console.error("Erro ao buscar álbuns:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao buscar álbuns:", error);
    }
  };

  const removeAlbum = async (albumId) => {
    //TODO: Implementar Remoção
    setTriggerUpdate(!triggerUpdate);
  };

  const addAlbum = async () => {
    try {
      const response = await fetch(
        "http://ec2-54-91-215-149.compute-1.amazonaws.com/api/invoke/createAsset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic cHNBZG1pbjpnb2xlZGdlcg==`, // Credenciais em Base64
          },
          body: JSON.stringify({
            asset: [
              {
                "@assetType": "album",
                name: input.albumTitle,
                artist: {
                  "@assetType": "artist",
                  name: input.artistName,
                  country: input.artistCountry,
                },
                year: Number(input.albumYear), // Certifique-se de que o ano seja um número.
              },
            ],
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        alert("Álbum adicionado com sucesso!");
        setTriggerUpdate(!triggerUpdate);
      } else {
        console.error(data);
        alert(`Erro ao adicionar álbum: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se conectar com o servidor.");
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
