
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("technology");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${category}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${API_KEY}`
        );
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [category]);

  return (
    <div className="min-h-screen flex flex-col text-[#1e293b] bg-gradient-to-b from-[#F8FBFF] to-[#EAF3FF]">
      {/* === NAVBAR === */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0033A0] via-[#0055C8] to-[#009FE3] shadow-md border-b border-blue-200 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-4">
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-extrabold text-white cursor-pointer tracking-wide"
          >
            DEV<span className="text-yellow-300">@</span>Deakin
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* === MAIN CONTENT === */}
      <main className="flex-grow pt-28 pb-10 px-6 text-center">
        <h1 className="text-3xl font-bold text-[#0033A0] mb-6 flex items-center justify-center gap-2">
          📰 Tech News Feed
        </h1>

        <div className="flex justify-center mb-8">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="technology">Technology</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="ai">AI</option>
            <option value="web development">Web Development</option>
            <option value="startups">Startups</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading news...</p>
        ) : articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#0033A0] mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {article.description?.slice(0, 100) || "No description..."}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* === FOOTER === */}
      <footer className="text-center text-gray-500 text-sm py-4 border-t bg-white/60">
        © {new Date().getFullYear()} DEV@Deakin — Empowering Student Developers
      </footer>
    </div>
  );
}
