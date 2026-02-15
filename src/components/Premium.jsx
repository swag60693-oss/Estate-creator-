export default function Premium({ isPremium, setIsPremium }) {

  const goPremium = async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  };

  if (isPremium) {
    return (
      <div style={{ background: "#ecfeff", padding: 15, borderRadius: 10 }}>
        <h3>⭐ Premium Active</h3>
        <p>No ads • Priority listings • Video promotion</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff7ed", padding: 15, borderRadius: 10 }}>
      <h3>🚀 Go Premium</h3>
      <p>Remove ads and boost your listings.</p>
      <button onClick={goPremium}>
        Upgrade for $5/month
      </button>
    </div>
  );
}
