import React, { useState, useEffect } from "react";
import "./App.css";

const API_BASE = "http://localhost:5000";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(API_BASE + "/api/encode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl })
    });
    const data = await res.json();
    setShortUrl(data.shortUrl);
    fetchUrls();
  };

  const fetchUrls = async () => {
    const res = await fetch(API_BASE + "/api/list");
    const data = await res.json();
    setUrls(data);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const filteredUrls = urls.filter((u) =>
    u.longUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>ShortLink</h1>
      <form onSubmit={handleSubmit} className="url-form">
        <input
          type="text"
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div className="result">
          Shortened URL: <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}

      <input
        className="search-bar"
        type="text"
        placeholder="Search long URLs..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="url-list">
        <h2> All Shortened URLs</h2>
        <ul>
          {filteredUrls.map((url, i) => (
            <li key={i}>
              <span className="long">{url.longUrl}</span> →{" "}
              <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                {url.shortUrl}
              </a>{" "}
              <span className="visits">({url.visits} visits)</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
