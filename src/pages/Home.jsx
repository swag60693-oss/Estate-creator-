import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    const utter = new SpeechSynthesisUtterance(
      "Welcome to Estate Connect! Explore properties and invest now."
    );
    speechSynthesis.speak(utter);
  }, []);

  const testimonials = [
    { name: "Alice M.", feedback: "Closed in 14 days!", photo: "https://i.pravatar.cc/50?img=1" },
    { name: "John D.", feedback: "Great ROI, highly recommend.", photo: "https://i.pravatar.cc/50?img=2" },
    { name: "Sophia L.", feedback: "Professional and fast service.", photo: "https://i.pravatar.cc/50?img=3" }
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ position: "relative", textAlign: "center" }}>
        <video autoPlay loop muted style={{ width: "100%", borderRadius: 10 }} src="https://www.w3schools.com/html/mov_bbb.mp4"/>
        <h1 style={{ position: "absolute", top: "30%", width: "100%", color: "white", fontSize: "3em", fontWeight: "bold" }}>
          Where Your Investment Meets Your Future
        </h1>
        <p style={{ position: "absolute", top: "45%", width: "100%", color: "white", fontSize: "1.2em" }}>
          Exclusive properties, faster returns, trusted advisors.
        </p>
        <button onClick={()=>window.location.href="/map"} style={{ position: "absolute", top: "55%", padding: "15px 30px", fontSize: "1em", backgroundColor:"#0057ff", color:"white", border:"none", borderRadius:8, cursor:"pointer" }}>
          Explore Properties
        </button>
      </div>

      <div style={{ marginTop: 40 }}>
        <h2>Trusted by Investors</h2>
        <div style={{ display: "flex", gap: 20 }}>
          {testimonials.map((t,i)=>(
            <div key={i} style={{ border: "1px solid #ccc", padding: 10, borderRadius: 10, flex:1, textAlign:"center" }}>
              <img src={t.photo} style={{ borderRadius:"50%" }} alt={t.name}/>
              <p><b>{t.name}</b></p>
              <p>{t.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
