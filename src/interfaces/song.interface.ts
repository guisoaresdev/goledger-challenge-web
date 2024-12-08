export default interface Song {
  "@assetType": "song";
  name: string;
  album: Album;
}

export default interface SongData {
  songName: string;
  albumTitle: string;
  artistName: string;
  artistCountry: string;
  albumYear: string;
}
