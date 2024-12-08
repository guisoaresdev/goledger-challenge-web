import Song from "./song.interface";

export default interface Playlist {
  "@assetType": "playlist";
  name: string;
  songs: Song[];
  private: boolean;
}

export default interface PlaylistData {
  playlistName: string;
  songs: Song[];
  private: boolean;
}
