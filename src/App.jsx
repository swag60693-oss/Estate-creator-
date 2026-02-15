import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding:10, background:"#eee" }}>
        <Link to="/" style={{margin:5}}>Home</Link>
        <Link to="/map" style={{margin:5}}>Map</Link>
        <Link to="/chat" style={{margin:5}}>Chat</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/map" element={<MapPage/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  );
}
