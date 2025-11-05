

// import React, { useState, useEffect } from "react";
// import { ref, set, update, onValue, remove } from "firebase/database";
// import { db } from "../../firebase/config";
// import { useAuth } from "../../context/AuthContext";

// export default function VideoCard({ video, onOpen }) {
//   const { currentUser } = useAuth();
//   const [userRating, setUserRating] = useState(0);
//   const [avgRating, setAvgRating] = useState(0);
//   const [views, setViews] = useState(video.views || 0);
//   const [watched, setWatched] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   // Listen for rating changes for this video
//   useEffect(() => {
//     const ratingsRef = ref(db, `tutorials/${video.id}/ratings`);
//     onValue(ratingsRef, (snapshot) => {
//       const ratings = snapshot.val() || {};
//       const values = Object.values(ratings);
//       const avg = values.length
//         ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
//         : 0;
//       setAvgRating(avg);
//       setUserRating(ratings[currentUser?.uid] || 0);
//     });
//   }, [video.id, currentUser?.uid]);

//   const handleView = () => {
//     if (watched) return;
//     const newViews = views + 1;
//     setViews(newViews);
//     setWatched(true);
//     update(ref(db, `tutorials/${video.id}`), { views: newViews });
//   };

//   const handleRating = (val) => {
//     set(ref(db, `tutorials/${video.id}/ratings/${currentUser.uid}`), val);
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this video?")) return;
//     try {
//       setDeleting(true);
//       await remove(ref(db, `tutorials/${video.id}`));
//       alert("Video deleted successfully!");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to delete video.");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const isOwner = currentUser && currentUser.email === video.uploadedBy;

//   return (
//     <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white p-4">
//       <div className="flex justify-between items-center mb-2">
//         <h4 className="font-semibold text-lg text-[#0033A0] truncate">
//           {video.title}
//         </h4>
//         {isOwner && (
//           <button
//             onClick={handleDelete}
//             disabled={deleting}
//             className="text-red-600 hover:text-white hover:bg-red-600 border border-red-400 text-sm px-3 py-1 rounded-full transition-all duration-200"
//           >
//             {deleting ? "Deleting..." : "🗑 Delete"}
//           </button>
//         )}
//       </div>

//       <div className="relative">
//         <video
//           src={video.videoUrl}
//           width="100%"
//           controls
//           onPlay={handleView}
//           className="rounded-lg mb-3 border border-gray-300"
//         ></video>
//         <button
//           onClick={onOpen}
//           className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-lg font-medium opacity-0 hover:opacity-100 transition-opacity"
//         >
//           ▶ View Fullscreen
//         </button>
//       </div>

//       <p className="text-sm text-gray-600 mb-2">
//         <span className="font-medium text-gray-800">Uploaded by:</span>{" "}
//         {video.uploadedBy}
//         <br />
//         Views: {views} | Avg Rating: ⭐ {avgRating}
//       </p>

//       {/* Rating Section */}
//       <div className="flex items-center gap-1">
//         {[1, 2, 3, 4, 5].map((s) => (
//           <span
//             key={s}
//             onClick={() => handleRating(s)}
//             className={`cursor-pointer text-2xl transition-colors ${
//               s <= userRating ? "text-yellow-400" : "text-gray-300"
//             }`}
//           >
//             ★
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import { ref, set, update, onValue, remove } from "firebase/database";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

export default function VideoCard({ video }) {
  const { currentUser } = useAuth();
  const [userRating, setUserRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [views, setViews] = useState(video.views || 0);
  const [watched, setWatched] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const videoRef = useRef(null);

  // 🔹 Fetch ratings in real-time
  useEffect(() => {
    const ratingsRef = ref(db, `tutorials/${video.id}/ratings`);
    onValue(ratingsRef, (snapshot) => {
      const ratings = snapshot.val() || {};
      const values = Object.values(ratings);
      const avg = values.length
        ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)
        : 0;
      setAvgRating(avg);
      setUserRating(ratings[currentUser?.uid] || 0);
    });
  }, [video.id, currentUser?.uid]);

  // 🔹 Handle views count
  const handleView = () => {
    if (watched) return;
    const newViews = views + 1;
    setViews(newViews);
    setWatched(true);
    update(ref(db, `tutorials/${video.id}`), { views: newViews });
  };

  // 🔹 Handle rating stars
  const handleRating = (val) => {
    set(ref(db, `tutorials/${video.id}/ratings/${currentUser.uid}`), val);
  };

  // 🔹 Delete video
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      setDeleting(true);
      await remove(ref(db, `tutorials/${video.id}`));
      alert("Video deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete video.");
    } finally {
      setDeleting(false);
    }
  };

  // 🔹 Fullscreen functionality
  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  const isOwner = currentUser && currentUser.email === video.uploadedBy;

  return (
    <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white p-4">
      {/* 🔹 Title + Delete button */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-lg text-[#0033A0] truncate">
          {video.title}
        </h4>
        {isOwner && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 hover:text-white hover:bg-red-600 border border-red-400 text-sm px-3 py-1 rounded-full transition-all duration-200"
          >
            {deleting ? "Deleting..." : "🗑 Delete"}
          </button>
        )}
      </div>

      {/* 🔹 Video player + fullscreen button */}
      <div className="relative group">
        <video
          ref={videoRef}
          src={video.videoUrl}
          width="100%"
          controls
          controlsList="nodownload"
          onPlay={handleView}
          className="rounded-lg mb-3 border border-gray-300"
        ></video>

        {/* Fullscreen button (top-right corner) */}
        <button
          onClick={handleFullscreen}
          className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-sm"
          title="Fullscreen"
        >
          ⛶
        </button>
      </div>

      {/* 🔹 Uploader + Stats */}
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-medium text-gray-800">Uploaded by:</span>{" "}
        {video.uploadedBy}
        <br />
        Views: {views} | Avg Rating: ⭐ {avgRating}
      </p>

      {/* 🔹 Rating stars */}
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            onClick={() => handleRating(s)}
            className={`cursor-pointer text-2xl transition-colors ${
              s <= userRating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
