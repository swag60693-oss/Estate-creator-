import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Role constants
const ROLES = {
  LANDLORD: "Landlord",
  AGENT: "Agent",
  TENANT: "Tenant",
};

export default function App() {
  // Pages
  const [page, setPage] = useState("home");

  // User data
  const userData = JSON.parse(localStorage.getItem("estateUser")) || {};
  const userRole = userData.role || ROLES.TENANT;
  const userName = userData.name || "Guest";

  // Markers (properties)
  const [markers, setMarkers] = useState([]);

  // Filter
  const [availabilityFilter, setAvailabilityFilter] = useState("All");

  // Chat
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Permissions
  const permissions = {
    [ROLES.LANDLORD]: { addProperty: true, chatWith: [ROLES.AGENT] },
    [ROLES.AGENT]: { addProperty: false, chatWith: [ROLES.LANDLORD, ROLES.TENANT] },
    [ROLES.TENANT]: { addProperty: false, chatWith: [ROLES.AGENT] },
  };

  useEffect(() => {
    const savedMarkers = localStorage.getItem("estateMarkers");
    if (savedMarkers) setMarkers(JSON.parse(savedMarkers));

    const savedMessages = localStorage.getItem("estateChats");
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, []);

  function login(e) {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      role: e.target.role.value,
    };
    localStorage.setItem("estateUser", JSON.stringify(data));
    window.location.reload();
  }

  function sendMessage(e) {
    e.preventDefault();
    if (!text) return;
    const msg = {
      from: userName,
      role: userRole,
      text,
      time: new Date().toLocaleTimeString(),
    };
    const updated = [...messages, msg];
    setMessages(updated);
    localStorage.setItem("estateChats", JSON.stringify(updated));
    setText("");
  }

  // Map click logic
  function MapClicker() {
    useMapEvents({
      click(e) {
        if (!permissions[userRole]?.addProperty) {
          alert("Only landlords can add property locations");
          return;
        }
        const newMarker = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          owner: userName,
          role: userRole,
          price: prompt("Enter monthly rent price"),
          availability: prompt("Availability: this month or next month"),
          description: prompt("Short property description"),
        };
        const updated = [...markers, newMarker];
        setMarkers(updated);
        localStorage.setItem("estateMarkers", JSON.stringify(updated));
      },
    });
    return null;
  }

  if (!userData.name) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Estate-Connect</h1>
        <form onSubmit={login}>
          <input name="name" placeholder="Your name" required /><br /><br />
          <select name="role">
            <option>{ROLES.LANDLORD}</option>
            <option>{ROLES.AGENT}</option>
            <option>{ROLES.TENANT}</option>
          </select><br /><br />
          <button>Enter</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial" }}>
      {/* Header */}
      <header style={{ padding: 15, background: "#0f172a", color: "#fff" }}>
        <h2>Estate-Connect</h2>
        <div style={{ fontSize: "12px", opacity: 0.8 }}>
          Logged in as: {userName} ({userRole})
        </div>
        <button onClick={() => setPage("home")}>Home</button>{" "}
        <button onClick={() => setPage("map")}>World Map</button>{" "}
        <button onClick={() => setPage("chat")}>Chat</button>{" "}
        <button onClick={() => setPage("about")}>About</button>
      </header>

      {/* Home Page */}
      {page === "home" && (
        <div>
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
            style={{ width: "100%", height: "260px", objectFit: "cover" }}
          />
          <div style={{ padding: 20 }}>
            <h2>Find Your Perfect Home</h2>
            <p>
              Estate-Connect brings landlords, agents and tenants together
              through direct communication and smart property discovery.
            </p>
          </div>
        </div>
      )}

      {/* Map Page */}
      {page === "map" && (
        <div>
          <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: "60vh", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <MapClicker />
            {markers.map((m, i) => {
              m.price = m.price || "Not set";
              m.availability = m.availability || "Unknown";
              m.description = m.description || "No description";
              m.owner = m.owner || "Unknown";
              return (
                <Marker key={i} position={[m.lat, m.lng]}>
                  <Popup>
                    Property Location<br />
                    <b>Owner:</b> {m.owner}<br />
                    <b>Price:</b> {m.price}<br />
                    <b>Available:</b> {m.availability}<br />
                    <b>Description:</b> {m.description}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          {/* Role badge */}
          <div style={{ padding: 10, background: "#e5e7eb" }}>
            <b>Your role:</b> {userRole}
          </div>

          {/* Property list with filter */}
          <div style={{ padding: 10, maxHeight: "200px", overflowY: "auto", borderTop: "1px solid #ccc" }}>
            <h3>Property List</h3>
            <div style={{ marginBottom: 10 }}>
              <label>Filter by availability: </label>
              <select value={availabilityFilter} onChange={e => setAvailabilityFilter(e.target.value)}>
                <option>All</option>
                <option>This month</option>
                <option>Next month</option>
              </select>
            </div>
            {markers
              .filter(m => availabilityFilter === "All" || m.availability === availabilityFilter)
              .map((m, i) => (
                <div key={i} style={{ padding: 5, marginBottom: 5, background: "#f9f9f9", borderRadius: 5 }}>
                  <b>Owner:</b> {m.owner} ({m.role})<br />
                  <b>Price:</b> {m.price}<br />
                  <b>Available:</b> {m.availability}<br />
                  <b>Description:</b> {m.description}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Chat Page */}
      {page === "chat" && (
        <div style={{ padding: 15 }}>
          <h3>Chat</h3>
          <div style={{
            border: "1px solid #ccc",
            height: 300,
            overflowY: "auto",
            padding: 10,
            background: "#f0f0f0"
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 10, textAlign: m.from === userName ? "right" : "left" }}>
                <div style={{
                  display: "inline-block",
                  background: m.from === userName ? "#dcf8c6" : "#fff",
                  padding: 8,
                  borderRadius: 8,
                  maxWidth: "80%"
                }}>
                  <small>{m.from} ({m.role})</small>
                  <div>{m.text}</div>
                  <small>{m.time}</small>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} style={{ display: "flex", marginTop: 10 }}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message"
              style={{ flex: 1, padding: 8 }}
            />
            <button>Send</button>
          </form>
        </div>
      )}

      {/* About Page */}
      {page === "about" && (
        <div style={{ padding: 20 }}>
          <h2>About Estate-Connect</h2>
          <p>
            Estate-Connect is a global real-estate platform connecting landlords,
            agents, and tenants using map-based discovery.
          </p>
          <h3>Developer Information</h3>
          <p><b>Developer:</b> Pashall KAMANGA</p>
          <p><b>Phone:</b> 0773759613</p>
          <p><b>Email:</b> swag60693@gmail.com</p>
        </div>
      )}
    </div>
  );
}
