const express = require("express");
const app = express();
const port = 5001;

var cors = require("cors");
app.use(cors({ origin: "http://localhost:8080" }));

app.get("/parse", (req, res) => {
  const resultsUrl = req.query.url;
  const puppeteer = require("puppeteer");

  async function getVideoUrl() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(resultsUrl, { timeout: 0, waitUntil: "networkidle0" });

    const title = await page.title();
    const [url] = await page.evaluate(() => 
      Array.from(document.querySelectorAll('a[href*="https://www.youtube.com/watch?v="]'), element => element.href));
    
    return url ? url : `No useful results found in search: ${title}`;
  }
  getVideoUrl().then((videoUrl) => {
    res.send(`{"videoUrl": "${videoUrl}"}`);
  });
});

app.listen(port, () => {
  console.log(`pup server listening at http://localhost:${port}`); 
});
