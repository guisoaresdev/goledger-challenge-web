import { albumService } from "../services/album.service";
import { Album, AlbumData } from "../interfaces/album.interface";

export const albumController = {
  async getAlbums(): Promise<Album[]> {
    try {
      const data = await albumService.fetchAlbums();
      return data.result;
    } catch (error) {
      console.error("Error fetching albums:", error.message);
      throw error;
    }
  },

  async getAlbumsByArtist(artistId): Promise<Void> {
    try {
      const data = await albumService.fetchAlbumsByArtist(artistId);
      return data.result;
    } catch (error) {
      console.error("Error fetching albums:", error.message);
      throw error;
    }
  },

  async getSongsByAlbum(albumId): Promise<Void> {
    try {
      const data = await albumService.fetchSongsByAlbum(albumId);
      return data.result;
    } catch (error) {
      console.error("Error fetching albums:", error.message);
      throw error;
    }
  },

  async addAlbum(albumData: AlbumData): Promise<void> {
    try {
      await albumService.createAlbum(albumData);
    } catch (error) {
      console.error("Error adding album:", error.message);
      throw error;
    }
  },

  async removeAlbum(albumId: string): Promise<void> {
    try {
      await albumService.deleteAlbum(albumId);
    } catch (error) {
      console.error("Error removing album:", error.message);
      throw error;
    }
  },
};
