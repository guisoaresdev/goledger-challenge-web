import { playlistService } from "../services/playlist.service";
import { Playlist } from "../interfaces/playlist.interface";

export const playlistController = {
  async getPlaylists(): Promise<Playlist[]> {
    try {
      const data = await playlistService.fetchPlaylists();
      return data.result;
    } catch (error) {
      console.error("Error fetching playlists:", error.message);
      throw error;
    }
  },

  async getSongsByPlaylist(playlistId): Promise<void> {
    try {
      const data = await playlistService.fetchSongsByPlaylist(playlistId);
      return data.result;
    } catch (error) {
      console.error("Error fetching playlists:", error.message);
      throw error;
    }
  },

  async addSongToPlaylist(playlistId: string,playlistData: Playlist): Promise<void> {
    try {
      await playlistService.addSongToPlaylist(playlistId, playlistData);
    } catch (error) {
      console.error("Error adding playlist:", error.message);
      throw error;
    }
  },

  async createPlaylist(playlistData: Playlist): Promise<void> {
    try {
      await playlistService.createPlaylist();
    } catch (error) {
      console.error("Error removing playlist:", error.message);
      throw error;
    }
  },

  async removePlaylist(playlistId: string): Promise<void> {
    try {
      await playlistService.deletePlaylist(playlistId);
    } catch (error) {
      console.error("Error removing playlist:", error.message);
      throw error;
    }
  },
};
