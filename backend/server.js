// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 5050;

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
  const expires = Date.now() + 2 * 60 * 1000;
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

// ===== ROUTE: Ask AI (Gemini 1.5 free-tier) =====
app.post("/api/ask", async (req, res) => {
  const { question } = req.body;
  if (!question)
    return res.status(400).json({ error: "Question is required" });

  console.log("🧠 Asking Gemini:", question);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: [
            {
              content: question,
              type: "text",
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("✅ Gemini raw data:", data);

    const answer =
      data?.candidates?.[0]?.content?.[0]?.text || "No response from Gemini";

    res.json({ answer });
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    res.status(500).json({ error: "Error connecting to Gemini API" });
  }
});

// ===== Start Server =====
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
