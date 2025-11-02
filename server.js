const express = require("express");
const fetch = require("node-fetch");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
  const prompt = req.body.prompt;
  
  try {
    const response = await fetch("https://api.bytez.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.BYTEZ_API_KEY
      },
      body: JSON.stringify({
        model: "LLaMA3-8B-Instruct",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch {
    res.json({ reply: "Error koneksi ke API!" });
  }
});

app.listen(3000, () => console.log("Server Running..."));
