const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

const urls = {};
const shortBaseUrl = "http://short.est/";

app.use(cors());
app.use(bodyParser.json());

//  Default root route
app.get('/', (req, res) => {
    res.send(" ShortLink API is running! Use POST /api/encode to shorten URLs.");
});

// Encode a long URL
app.post('/api/encode', (req, res) => {
    const { longUrl } = req.body;
    const code = Math.random().toString(36).substring(2, 8);
    urls[code] = {
        longUrl,
        createdAt: new Date().toISOString(),
        visits: 0
    };
    res.json({ shortUrl: shortBaseUrl + code });
});

//  Decode a short URL
app.post('/api/decode', (req, res) => {
    const { shortUrl } = req.body;
    const code = shortUrl.split('/').pop();
    const data = urls[code];
    if (data) {
        res.json({ longUrl: data.longUrl });
    } else {
        res.status(404).json({ error: "URL not found" });
    }
});

//  Get statistics for a short URL
app.get('/api/statistic/:code', (req, res) => {
    const code = req.params.code;
    const data = urls[code];
    if (data) {
        res.json({
            longUrl: data.longUrl,
            createdAt: data.createdAt,
            visits: data.visits
        });
    } else {
        res.status(404).json({ error: "URL not found" });
    }
});

//  List all URLs
app.get('/api/list', (req, res) => {
    const result = Object.entries(urls).map(([code, data]) => ({
        shortUrl: shortBaseUrl + code,
        longUrl: data.longUrl,
        createdAt: data.createdAt,
        visits: data.visits
    }));
    res.json(result);
});

//  Redirect to the original long URL
app.get('/:code', (req, res) => {
    const { code } = req.params;
    if (urls[code]) {
        urls[code].visits += 1;
        res.redirect(urls[code].longUrl);
    } else {
        res.status(404).send("Short URL not found");
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
