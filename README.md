# 🌦️💰 Storm Chain 📡📰

Storm Chain project is a real-time dashboard web app that brings together 🌤️ weather data, 🪙 cryptocurrency info, and 🗞️ top news headlines — all in one place! It features detailed views for each weather city and cryptocurrency, live WebSocket updates. Fully responsive, fast, and publicly deployed! 🚀  
 
Check out the live version 👉  https://crypto-weather-nexus-weld.vercel.app

---

## 🧰 Tech Stack & Tools

| Tool/Tech            | Purpose                          |
|----------------------|----------------------------------|
| ⚛️ Next.js (v13+)     | React-based Framework           |
| 🧠 Redux Toolkit      | State Management                |
| 🎨 Tailwind CSS       | Styling                         |
| 🌐 OpenWeatherMap API | Weather Data                    |
| 💸 CoinGecko API      | Cryptocurrency Prices           |
| 🗞️ NewsData.io API    | News Headlines                  |
| 🌈 Framer Motion      | Animations                      |
| 🌍 Vercel             | Deployment                   |
| 🔌 WebSocket          | Real-time updates               |

---

## 🧪 What We Installed

```bash
npm install @reduxjs/toolkit react-redux
npm install tailwindcss postcss autoprefixer
npm install framer-motion
npm install axios
npm install socket.io-client

Also initialized Tailwind CSS:

bash
Copy
Edit
npx tailwindcss init -p

🚀 How to Run Locally
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/cryptoweather-nexus.git
cd cryptoweather-nexus
Install dependencies:

bash
Copy
Edit
npm install
Run the dev server:

bash
Copy
Edit
npm run dev
Visit http://localhost:3000 to view it in action!

💡 Features
🌦️ Weather details for New York, London, and Tokyo

💸 Live cryptocurrency prices for Bitcoin, Ethereum, and Dogecoin

🗞️ Real-time news headlines with source chips

🎯 Detail pages for both city weather and individual crypto assets

//TODO Smooth fade-in image transitions and WebSocket updates

😤 Challenges We Faced (And Crushed)
1. 📉 WebSocket + Redux Integration
Getting real-time updates working in sync with Redux was tricky — state conflicts and re-renders were breaking the UI. We eventually set up a clean middleware-like layer to handle socket events smoothly. 💪

2. 🔀 API Rate Limits & Data Caching
We hit rate limits during development (especially NewsData.io). We introduced caching strategies and debounced calls to avoid over-fetching.
3. 📊 Crypto Graph Rendering + Time Range Handling
This was a beast! We needed to fetch and display historical price data dynamically based on user-selected time ranges (1D, 1W, 1M). The tricky part? Re-rendering the graph **without flickers**, managing loading states, and syncing the Redux state with the chart data. After trial-and-error with multiple render conditions and refactoring the chart component to handle updates reactively, we nailed it! 🚀📈


✍️ Author
GitHub: @varunsiravuri

🌐 Live Demo
Check out the live version 👉 https://crypto-weather-nexus-weld.vercel.app




