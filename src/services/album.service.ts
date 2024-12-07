import Album from "../interfaces/album.interface";
import AlbumData from "../interfaces/album.interface";
import Artist from "../interfaces/artist.interface";

const API_URL: string = import.meta.env.VITE_API_URL;
const AUTH_HEADER: string = import.meta.env.VITE_AUTH_HEADER;

export const albumService = {
  async fetchAlbums(): Promise<{ result: Album[] }> {
    const response = await fetch(`${API_URL}/query/search`, {
      method: "POST",
      headers: {
        Authorization: AUTH_HEADER,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          selector: {
            "@assetType": "album",
          },
        },
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch albums");
    }
    return response.json();
  },

  async createAlbum(albumData: AlbumData): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/invoke/createAsset`, {
        method: "POST",
        headers: {
          Authorization: AUTH_HEADER,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset: [
            {
              "@assetType": "album",
              name: albumData.albumTitle,
              artist: {
                "@assetType": "artist",
                name: albumData.artistName,
                country: albumData.artistCountry,
              },
              year: Number(albumData.albumYear),
            },
          ],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Álbum adicionado com sucesso!");
      } else {
        console.error(data);
        alert(`Erro ao adicionar álbum: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se conectar com o servidor.");
    }
  },

  async deleteAlbum(albumId: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/invoke/deleteAsset`, {
        method: "DELETE",
        headers: {
          Authorization: AUTH_HEADER,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset: [
            {
              "@assetType": "album",
              id: albumId, // Corrigir para passar o ID
            },
          ],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Álbum removido com sucesso!");
      } else {
        console.error(data);
        alert(`Erro ao remover o álbum: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se conectar com o servidor.");
    }
  },
};
