import Artist from "../interfaces/artist.interface";

const API_URL: string = import.meta.env.VITE_API_URL;
const AUTH_HEADER: string = import.meta.env.VITE_AUTH_HEADER;

export const artistService = {
  async fetchArtists(): Promise<{ result: Artist[] }> {
    const response = await fetch(`${API_URL}/query/search`, {
      method: "POST",
      headers: {
        Authorization: AUTH_HEADER,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          selector: {
            "@assetType": "artist",
          },
        },
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch artists");
    }
    return response.json();
  },

  async createArtist(artistData: ArtistData): Promise<void> {
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
              "@assetType": "artist",
              name: artistData.artistName,
              country: artistData.artistCountry,
            },
          ],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Artista adicionado com sucesso!");
      } else {
        console.error(data);
        alert(`Erro ao adicionar artista: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se conectar com o servidor.");
    }
  },

  async deleteArtist(artistId: string): Promise<void> {
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
              "@assetType": "artist",
              id: artistId,
            },
          ],
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Artista removido com sucesso!");
      } else {
        console.error(data);
        alert(`Erro ao remover um artista: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao se conectar com o servidor.");
    }
  },
};
