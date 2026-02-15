import React from "react";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <div style={{
        background: "#777",
        padding: 40,
        color: "#fff",
        textAlign: "center",
        borderRadius: 8
      }}>
        <h1>Time to Invest</h1>
        <p>Connecting people through real estate</p>
        <button style={{
          padding: "12px 24px",
          fontSize: 16,
          background: "#22c55e",
          border: "none",
          borderRadius: 6,
          color: "#fff"
        }}>
          Invest Now
        </button>
      </div>
    </div>
  );
}
