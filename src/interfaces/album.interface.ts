import Artist from "./artist.interface";

export default interface Album {
  "@assetType": "album";
  name: string;
  artist: Artist;
  year: number;
}

export default interface AlbumData {
  albumTitle: string;
  artistName: string;
  artistCountry: string;
  albumYear: string;
}
