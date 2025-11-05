import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

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

          <div className="flex items-center gap-6 text-white font-medium">
            <button
              onClick={() => navigate("/")}
              className="hover:text-yellow-300 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/login")}
              className="hover:text-yellow-300 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="hover:text-yellow-300 transition-colors"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* Offset for fixed navbar */}
      <div className="h-20" />

      {/* === HERO SECTION === */}
      <section className="relative flex flex-col lg:flex-row justify-between items-center grow px-10 md:px-16 py-24">
        {/* Gradient background accents */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#009FE3]/20 blur-[150px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0033A0]/10 blur-[180px] rounded-full -z-10"></div>

        {/* LEFT CONTENT */}
        <div className="max-w-xl space-y-6 z-10 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#0033A0]">
            Empowering Developers at{" "}
            <span className="text-[#009FE3]">Deakin</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            A secure, collaborative, and AI-powered platform built for the next
            generation of developers. Learn, share, and grow within a trusted
            environment — powered by modern tech.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#0033A0] to-[#009FE3] hover:opacity-90 text-white shadow-lg font-semibold text-lg transition-all duration-300 hover:scale-[1.03]"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-lg border-2 border-[#0033A0] text-[#0033A0] hover:bg-[#0033A0] hover:text-white font-medium text-lg transition-all duration-300"
            >
              Join Now
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative group animate-slide-up">
          <div className="absolute -inset-3 bg-gradient-to-r from-[#0033A0] to-[#009FE3] opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-all duration-500"></div>
          <img
            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
            alt="Developer at work"
            className="relative w-[380px] lg:w-[500px] rounded-2xl shadow-xl border border-gray-200"
          />
        </div>
      </section>

      {/* === FEATURE CARDS === */}
      <section className="px-8 md:px-16 py-20 bg-[#F9FBFF] border-t border-gray-200">
        <h3 className="text-3xl font-semibold text-center mb-12 text-[#0033A0]">
          What Makes DEV@Deakin Special
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "🔒 Secure Access",
              desc: "Two-factor authentication ensures your account stays protected.",
              color: "from-[#009FE3]/10 to-[#0033A0]/10",
            },
            {
              title: "🎓 Learning Hub",
              desc: "Access tutorials, coding sessions, and interactive challenges.",
              color: "from-[#0033A0]/10 to-[#009FE3]/10",
            },
            {
              title: "🌐 Community",
              desc: "Collaborate with peers and share your knowledge with others.",
              color: "from-[#009FE3]/10 to-[#0033A0]/10",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`p-6 bg-gradient-to-br ${feature.color} rounded-xl border border-gray-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
            >
              <h4 className="text-xl font-semibold mb-2 text-[#0033A0]">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="py-6 text-center text-gray-600 border-t border-gray-200 bg-white text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#0033A0] font-semibold">DEV@Deakin</span> — Made
        with 💙 by <span className="text-[#009FE3] font-medium">Riya</span>
      </footer>
    </div>
  );
}
