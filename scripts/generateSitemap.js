const fs = require('fs');

const DOMAIN = "https://estate-connect-xxx.vercel.app"; // <-- replace with your Vercel URL

// Generate 40,000 demo properties
const properties = Array.from({length: 40000}, (_, i) => ({
  url: `${DOMAIN}/property/${i+1}`
}));

// Sitemap header
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Add homepage
sitemap += `  <url><loc>${DOMAIN}/</loc></url>\n`;

// Add all properties
properties.forEach(p => {
  sitemap += `  <url><loc>${p.url}</loc></url>\n`;
});

// Close XML
sitemap += `</urlset>`;

// Write file
fs.writeFileSync('public/sitemap.xml', sitemap);
console.log("✅ Sitemap generated with 40,000 properties!");
