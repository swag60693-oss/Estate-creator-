const axios = require("axios");

// Your deployed site URL
const siteUrl = "https://estate-connect-c00naz6tt-swagger-s-projects.vercel.app";

// Demo chat messages
const chatMessages = [
  "Hi, I'm interested in this property.",
  "Can I schedule a visit tomorrow?",
  "Do you have more pictures?",
  "What's the monthly rent?",
  "Is this property still available?"
];

// Demo ad clicks/messages
const adActions = [
  "Viewed premium ad: Upgrade now!",
  "Clicked on estate promotion ad",
  "Watched video about Estate-Connect",
  "Read our featured property ad"
];

// Properties (IDs for demo)
const properties = [1,2];

// Number of bots
const numBots = 500;

// Random delay helper
function randomDelay(min=500, max=3000){ return Math.floor(Math.random()*(max-min+1)+min); }

// Simulate a bot
async function simulateBot(botId){
  try {
    // Visit homepage
    await axios.get(siteUrl);
    console.log(`Bot #${botId} visited homepage`);

    // Visit other pages randomly
    const pages = ["map","about","profile","post"];
    const randomPage = pages[Math.floor(Math.random()*pages.length)];
    await axios.get(`${siteUrl}/${randomPage}`);
    console.log(`Bot #${botId} visited ${randomPage} page`);

    // Trigger a random ad
    const ad = adActions[Math.floor(Math.random()*adActions.length)];
    console.log(`Bot #${botId} action: ${ad}`);

    // Send a random chat message
    const message = chatMessages[Math.floor(Math.random()*chatMessages.length)];
    // This assumes your chat endpoint is /api/chat (adjust if different)
    await axios.post(`${siteUrl}/api/chat`, { from: `Bot${botId}`, text: message }).catch(()=>{});
    console.log(`Bot #${botId} sent chat: ${message}`);

    // Click/view a random property
    const propertyId = properties[Math.floor(Math.random()*properties.length)];
    await axios.get(`${siteUrl}/property/${propertyId}`).catch(()=>{});
    console.log(`Bot #${botId} viewed property #${propertyId}`);

  } catch(err){
    console.log(`Bot #${botId} error: ${err.message}`);
  }
}

// Launch bots with staggered delays
(async()=>{
  for(let i=1;i<=numBots;i++){
    setTimeout(()=>simulateBot(i), randomDelay());
  }
})();
