import { Song, SongData } from "../interfaces/song.interface";

const API_URL: string = import.meta.env.VITE_API_URL;
const AUTH_HEADER: string = import.meta.env.VITE_AUTH_HEADER;

export const songService = {
  async fetchAlbums(): Promise<{ result: Song[] }> {
    const response = await fetch(`${API_URL}/query/search`, {
      method: "POST",
      headers: {
        Authorization: AUTH_HEADER,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          selector: {
            "@assetType": "song",
          },
        },
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch albums");
    }
    return response.json();
  },

  async createSong(songData: SongData): Promise<void> {
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
              "@assetType": "song",
              name: songData.songName,
              album: {
                "@assetType": "album",
                name: songData.albumTitle,
                artist: {
                  "@assetType": "artist",
                  name: songData.artistName,
                  country: songData.artistCountry,
                },
                year: songData.albumYear,
              },
            },
          ],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Musica adicionada com sucesso!");
      } else {
        console.error(data);
        alert(`Erro ao adicionar uma música: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se conectar com o servidor.");
    }
  },

  async deleteSong(songId: string): Promise<void> {
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
              "@assetType": "song",
              id: songId,
            },
          ],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Musica removida com sucesso!");
      } else {
        console.error(data);
        alert(`Erro ao remover a musica: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se conectar com o servidor.");
    }
  },
};
