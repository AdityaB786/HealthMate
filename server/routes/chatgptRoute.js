const express = require("express");
const axios = require("axios");
require("dotenv").config();

const chatgptRoute = express.Router();

chatgptRoute.post("/get-response", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  console.log("Received prompt: ", prompt);

  try {
    // Debugging the API key
    console.log("Using API Key: ", process.env.OPENAI_API_KEY);  // Check if API key is correctly loaded

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions", 
      {
        model: "gpt-3.5-turbo",  // Change to the correct model
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
        },
      }
    );

    console.log("OpenAI response: ", response.data);

    return res.json({
      answer: response.data.choices[0].message.content.trim(),
    });
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error.message);
    return res.status(500).json({
      error: "Failed to fetch response from OpenAI. Please try again later.",
    });
  }
});

module.exports = chatgptRoute;
