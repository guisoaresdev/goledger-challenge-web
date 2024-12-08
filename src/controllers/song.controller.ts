import { songService } from "../services/song.service";
import Song from "../interfaces/song.interface";

export const songController = {
  async getAlbumSongs(albumId: string): Promise<Song[]> {
    try {
      const data = await songService.fetchSongs(albumId);
      return data.result;
    } catch (error) {
      console.error("Error fetching albums:", error.message);
      throw error;
    }
  },

  async addAlbum(songData: SongData): Promise<void> {
    try {
      await songService.createSong(songData);
    } catch (error) {
      console.error("Error adding album:", error.message);
      throw error;
    }
  },

  async removeAlbum(songId: string): Promise<void> {
    try {
      await songService.deleteSong(songId);
    } catch (error) {
      console.error("Error removing album:", error.message);
      throw error;
    }
  },
};
