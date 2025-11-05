// server.js
import express from "express";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ FIXED CORS for Render + Netlify
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://hdpro.netlify.app"); // your frontend domain
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // handle preflight requests
  }

  next();
});

// ✅ Port configuration
const PORT = process.env.PORT || 3000;

// ===== SENDGRID SETUP =====
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const verificationCodes = {};

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ===== ROUTE: Send 2FA =====
app.post("/send-2fa", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const code = generateCode();
  const expires = Date.now() + 2 * 60 * 1000; // 2 mins expiry
  verificationCodes[email] = { code, expires };

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Your DEV@Deakin Verification Code",
    text: `Your verification code is ${code}`,
    html: `<p>Your verification code is <b>${code}</b>. It expires in 2 minutes.</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Code sent to ${email}: ${code}`);
    res.json({ success: true });
  } catch (error) {
    console.error("SendGrid error:", error);
    res.status(500).json({ error: "Failed to send verification email" });
  }
});

// ===== ROUTE: Verify 2FA =====
app.post("/verify-2fa", (req, res) => {
  const { email, code } = req.body;
  const record = verificationCodes[email];
  if (!record) return res.status(400).json({ error: "No code found" });
  if (Date.now() > record.expires)
    return res.status(400).json({ error: "Code expired" });
  if (record.code !== code)
    return res.status(400).json({ error: "Invalid code" });
  delete verificationCodes[email];
  res.json({ success: true });
});

// ===== ROUTE: Fetch News =====
app.get("/api/news", async (req, res) => {
  const category = req.query.category || "technology";
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(category)}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${process.env.NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ News API Error:", err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});


// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
