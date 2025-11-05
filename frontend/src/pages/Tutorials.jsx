import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import UploadVideo from "../components/Tutorials/UploadVideo";
import VideoCard from "../components/Tutorials/VideoCard";
import { useNavigate } from "react-router-dom";

export default function Tutorials() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // For modal navigation

  useEffect(() => {
    if (!currentUser) navigate("/login");
    const tutorialRef = ref(db, "tutorials");
    onValue(tutorialRef, (snap) => {
      const val = snap.val() || {};
      const arr = Object.entries(val).map(([id, data]) => ({ id, ...data }));
      setVideos(arr.reverse());
    });
  }, [currentUser]);

  // Scroll/swipe navigation inside full screen modal
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1 < videos.length ? prev + 1 : prev));
  };
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  return (
    <div className="min-h-screen flex flex-col text-[#1e293b] bg-gradient-to-br from-[#E9F1FF] via-[#F5FAFF] to-white">
      {/* === NAVBAR === */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0033A0] via-[#0055C8] to-[#009FE3] shadow-md border-b border-blue-200 backdrop-blur-md">
        <div className="flex justify-between items-center px-8 py-4">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold text-white cursor-pointer tracking-tight hover:scale-105 transition-transform"
          >
            DEV<span className="text-yellow-300">@</span>Deakin
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all duration-200"
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* === CONTENT === */}
      <main className="flex-grow max-w-5xl mx-auto w-full mt-28 bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-[#0033A0] mb-6 text-center">
          Tutorials
        </h2>

        {/* Upload Section */}
        <div className="mb-8 bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
          <UploadVideo />
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((v, i) => (
              <VideoCard
                key={v.id}
                video={v}
                onOpen={() => setActiveIndex(i)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No tutorials uploaded yet.
            </p>
          )}
        </div>
      </main>

      {/* === FOOTER === */}
      <footer className="text-center text-gray-500 text-sm py-6 mt-10">
        © {new Date().getFullYear()} DEV@Deakin — All Rights Reserved
      </footer>

      {/* === FULL SCREEN MODAL === */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center transition-all"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videos[activeIndex].videoUrl}
              controls
              autoPlay
              className="w-full rounded-lg shadow-2xl"
            ></video>

            {/* Navigation arrows */}
            {activeIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black/40 px-3 py-2 rounded-r-lg hover:bg-black/60"
              >
                ‹
              </button>
            )}
            {activeIndex < videos.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black/40 px-3 py-2 rounded-l-lg hover:bg-black/60"
              >
                ›
              </button>
            )}
          </div>

          <button
            onClick={() => setActiveIndex(null)}
            className="mt-6 text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg shadow-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
