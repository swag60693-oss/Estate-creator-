const axios = require("axios");

// URL of your deployed app
const siteUrl = "https://estate-connect-c00naz6tt-swagger-s-projects.vercel.app";

// Number of bots to simulate
const numBots = 1000;

// Random delays to simulate real users
function randomDelay(min = 500, max = 3000) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function visitSite(botId) {
  try {
    // GET the homepage
    await axios.get(siteUrl);
    console.log(`Bot #${botId} visited the homepage`);

    // Randomly "click" other pages
    const pages = ["map", "about", "profile"];
    const randomPage = pages[Math.floor(Math.random() * pages.length)];
    await axios.get(`${siteUrl}/${randomPage}`);
    console.log(`Bot #${botId} visited ${randomPage} page`);
  } catch (err) {
    console.log(`Bot #${botId} error:`, err.message);
  }
}

// Launch all bots with small delays
(async () => {
  for (let i = 1; i <= numBots; i++) {
    setTimeout(() => visitSite(i), randomDelay());
  }
})();
