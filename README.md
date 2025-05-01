# 🔗 ShortLink - URL Shortening Web App

This is a full-stack project that allows users to shorten URLs, view statistics, and manage their shortened links.

## 🛠️ Technologies
- **Frontend:** React
- **Backend:** Node.js, Express
- **Testing:** Jest, Supertest
- **Storage:** In-Memory (no DB)

---

## 🚀 Setup Instructions

### 📦 Backend
1. Open terminal and navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install express body-parser cors
   ```
3. Run the server:
   ```bash
   node app.js
   ```
4. Backend will start at `http://localhost:5000`

### 🌐 Frontend
1. Open a new terminal and navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```
4. Frontend will open at `http://localhost:3000`

---

## 🔌 API Endpoints

| Method   | Endpoint                                      
-------------------
| POST    `/api/encode`                                     
| POST    `/api/decode`                                  
| GET     `/api/list`                                     
| GET     `/api/statistic/:code`          
| GET     `/:code`                               



## 🧪 Running Tests

Tests are written with **Jest + Supertest** for the encode/decode endpoints.

1. From the `backend` directory:
   ```bash
   npm install jest supertest
   ```
2. Add this to `package.json` scripts section:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```
3. Run tests:
   ```bash
   npm test
  


