import SongData from "../interfaces/song.interface";

const API_URL: string = import.meta.env.VITE_API_URL;
const AUTH_HEADER: string = import.meta.env.VITE_AUTH_HEADER;

export const playlistService = {
  async addSongToPlaylist(playlistId: string, song: SongData): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/invoke/updateAsset`, {
        method: "PATCH",
        headers: {
          Authorization: AUTH_HEADER,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset: [
            {
              "@assetType": "playlist",
              id: playlistId,
              action: "add",
              songs: [song],
            },
          ],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Música adicionada à playlist com sucesso!");
      } else {
        console.error(data);
        alert(`Erro ao adicionar música à playlist: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se conectar com o servidor.");
    }
  },

  async removeSongFromPlaylist(playlistId: string, songId: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/invoke/updateAsset`, {
        method: "PATCH",
        headers: {
          Authorization: AUTH_HEADER,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset: [
            {
              "@assetType": "playlist",
              id: playlistId,
              action: "remove",
              songs: [
                {
                  "@key": songId,
                },
              ],
            },
          ],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Música removida da playlist com sucesso!");
      } else {
        console.error(data);
        alert(`Erro ao remover música da playlist: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se conectar com o servidor.");
    }
  },

  async fetchSongsFromPlaylist(playlistName: string): Promise<{ result: any[] }> {
    try {
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
              name: playlistName,
            },
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch songs from playlist");
      }
      return response.json();
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao se conectar com o servidor.");
    }
  },
};
