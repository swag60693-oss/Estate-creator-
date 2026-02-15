import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Profile({ user }) {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (data) {
      setUsername(data.username || "");
      setAvatar(data.avatar_url || "");
    }
  }

  async function saveProfile() {
    await supabase.from("profiles").upsert({
      id: user.id,
      username,
      avatar_url: avatar,
    });
    alert("Profile saved");
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>👤 Your Profile</h3>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder="Avatar image URL"
        value={avatar}
        onChange={e => setAvatar(e.target.value)}
      />

      {avatar && <img src={avatar} width="80" />}

      <br />
      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}
