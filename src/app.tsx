import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArtistView from "./views/artist/artist.view";
import AlbumView from "./views/album/album.view";
import SongView from "./views/song/song.view";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ArtistView />} />
        <Route path="/artist/:artistId/albums" element={<AlbumView />} />
        <Route path="/album/:albumId/songs" element={<SongView />} />
      </Routes>
    </Router>
  );
}

export default App;
