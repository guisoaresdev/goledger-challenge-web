import { artistService } from "../services/artist.service";
import Artist from "../interfaces/artist.interface";

export const artistController = {
  async getArtists(): Promise<Artist[]> {
    try {
      const data = await artistService.fetchArtists();
      return data.result;
    } catch (error) {
      console.error("Error fetching artists:", error.message);
      throw error;
    }
  },

  async addArtist(artistData: AlbumData): Promise<void> {
    try {
      await artistService.createArtist(artistData);
    } catch (error) {
      console.error("Error adding artist:", error.message);
      throw error;
    }
  },

  async removeArtist(artistId: string): Promise<void> {
    try {
      await artistService.deleteArtist(artistId);
    } catch (error) {
      console.error("Error removing album:", error.message);
      throw error;
    }
  },
};
