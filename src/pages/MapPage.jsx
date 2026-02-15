import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
export default function MapPage() {
  const demoProperties = [
    { id:1, name:"Villa Sunset", price:"$200,000", coords:[48.8566,2.3522], thumbnail:"https://picsum.photos/100/60?random=1" },
    { id:2, name:"City Apartment", price:"$120,000", coords:[48.8600,2.3500], thumbnail:"https://picsum.photos/100/60?random=2" },
    { id:3, name:"Beach House", price:"$350,000", coords:[48.8520,2.3600], thumbnail:"https://picsum.photos/100/60?random=3" }
  ];
  const [filterPrice,setFilterPrice] = useState([0,1000000]);
  return (
    <div style={{ height:"90vh", padding:20 }}>
      <h2>🗺️ Explore Properties</h2>
      <div style={{ marginBottom:10 }}>
        <label>Max Price: </label>
        <input type="number" value={filterPrice[1]} onChange={e=>setFilterPrice([0,Number(e.target.value)])}/>
      </div>

      <MapContainer center={[48.8566,2.3522]} zoom={13} style={{ height:"80%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        {demoProperties.filter(p=>parseInt(p.price.replace(/\D/g,''))<=filterPrice[1]).map(p=>(
          <Marker key={p.id} position={p.coords}>
            <Popup>
              <img src={p.thumbnail} alt={p.name} style={{ width:"100%" }}/>
              <b>{p.name}</b><br/>Price: {p.price}<br/>
              <button style={{ marginTop:5, backgroundColor:"#ff0057", color:"white", border:"none", padding:"5px 10px", borderRadius:5 }}>
                ♥ Save
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
