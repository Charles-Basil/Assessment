const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const urls = {};
const shortBaseUrl = "http://short.est/";

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

app.post("/api/encode", (req, res) => {
  const { longUrl } = req.body;
  const code = generateShortCode();
  urls[code] = { longUrl, createdAt: new Date(), visits: 0 };
  res.json({ shortUrl: shortBaseUrl + code });
});

app.post("/api/decode", (req, res) => {
  const { shortUrl } = req.body;
  const code = shortUrl.split("/").pop();
  const data = urls[code];
  if (data) {
    res.json({ longUrl: data.longUrl });
  } else {
    res.status(404).json({ error: "URL not found" });
  }
});

describe("URL Shortener API", () => {
  let shortUrl = "";

  test("POST /api/encode should return a short URL", async () => {
    const res = await request(app)
      .post("/api/encode")
      .send({ longUrl: "https://indicina.co" });
    expect(res.statusCode).toBe(200);
    expect(res.body.shortUrl).toMatch(/^http:\/\/short\.est\//);
    shortUrl = res.body.shortUrl;
  });

  test("POST /api/decode should return the original long URL", async () => {
    const res = await request(app)
      .post("/api/decode")
      .send({ shortUrl });
    expect(res.statusCode).toBe(200);
    expect(res.body.longUrl).toBe("https://indicina.co");
  });
});
