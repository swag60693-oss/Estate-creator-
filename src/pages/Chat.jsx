import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");
export default function Chat() {
  const [messages,setMessages] = useState([]);
  const [username,setUsername] = useState("");
  const [avatar,setAvatar] = useState("");
  const [text,setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(()=>{
    fetch("http://localhost:3000/messages").then(res=>res.json()).then(setMessages);
    socket.on("newMessage", msg=>{
      setMessages(m=>[...m,msg]);
      new Audio("https://www.soundjay.com/button/beep-07.wav").play().catch(()=>{});
      if(Notification.permission==="granted"){
        new Notification(`${msg.username} says:`,{body: msg.message, icon: msg.avatar||`https://ui-avatars.com/api/?name=${encodeURIComponent(msg.username)}&background=random&size=40`});
      }
    });
    if(Notification.permission!=="granted") Notification.requestPermission();
  },[]);

  useEffect(()=>{messagesEndRef.current?.scrollIntoView({behavior:"smooth"});},[messages]);

  const send=()=>{if(!username||!text)return; socket.emit("sendMessage",{username,message:text,avatar}); setText("");};
  const defaultAvatar=name=>`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=40`;
  const userColor=name=>{let hash=0;for(let i=0;i<name.length;i++)hash=name.charCodeAt(i)+((hash<<5)-hash);const c=(hash&0x00ffffff).toString(16).toUpperCase();return "#"+"00000".substring(0,6-c.length)+c;};
  const emojis=["👍","❤️","😂","🔥","🎉"];
  const addReaction=(i,e)=>{const newM=[...messages]; newM[i].reaction=e; setMessages(newM);};

  return (
    <div style={{padding:20}}>
      <h2>💬 Live Chat Enhanced</h2>
      <input placeholder="Your name" value={username} onChange={e=>setUsername(e.target.value)} style={{marginBottom:10}}/>
      <input placeholder="Avatar URL (optional)" value={avatar} onChange={e=>setAvatar(e.target.value)} style={{marginBottom:10,width:"100%"}}/>
      <div style={{maxHeight:"400px",overflowY:"auto",border:"1px solid #ccc",margin:"10px 0",padding:"5px"}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",marginBottom:5,backgroundColor:userColor(m.username)+"22",padding:5,borderRadius:8}}>
            <img src={m.avatar||defaultAvatar(m.username)} alt="avatar" style={{width:40,height:40,borderRadius:"50%",marginRight:8}}/>
            <div style={{flex:1}}>
              <p style={{margin:0}}><b>{m.username}:</b> {m.message}</p>
              {m.reaction && <p style={{margin:0}}>Reaction: {m.reaction}</p>}
              <div>{emojis.map((e,idx)=><button key={idx} style={{marginRight:5}} onClick={()=>addReaction(i,e)}>{e}</button>)}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}/>
      </div>
      <input placeholder="Message" value={text} onChange={e=>setText(e.target.value)}/>
      <button onClick={send} style={{marginLeft:5}}>Send</button>
    </div>
  );
}
