import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

export default function UploadVideo() {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !title)
      return alert("Please select a video and enter a title.");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (!data.secure_url) throw new Error("Upload failed");

      await push(ref(db, "tutorials"), {
        title,
        videoUrl: data.secure_url,
        uploadedBy: currentUser.email,
        createdAt: Date.now(),
        views: 0,
        ratings: {},
      });

      alert("Video uploaded successfully!");
      setTitle("");
      setVideoFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-xl font-semibold text-[#0033A0]">Upload Tutorial</h3>
      <form
        onSubmit={handleUpload}
        className="flex flex-col sm:flex-row gap-4 w-full justify-center"
      >
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          required
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#0033A0] text-white rounded-lg hover:bg-[#002070] transition-all duration-200"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
