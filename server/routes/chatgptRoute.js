const express = require("express");
const axios = require("axios");
require("dotenv").config();
const _ = require("lodash");

const geminiRoute = express.Router();

geminiRoute.post("/get-response", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  console.log(`Received prompt: "${prompt}"`);

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing Gemini API key in environment variables.");
      return res.status(500).json({
        error: "Server configuration error. Please contact support.",
      });
    }
    console.log(`API key: ${process.env.GEMINI_API_KEY}`);

    // Sending the POST request to Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Log the full response for debugging
    console.log("Full response from Gemini API:", JSON.stringify(response.data, null, 2));

    // Adjusted code to extract the generated text
    const generatedText = _.get(
      response,
      "data.candidates[0].content.parts[0].text",
      "No response generated."
    );

    console.log("Generated Text:", generatedText);

    // Send the response back to the frontend
    return res.json({
      answer: generatedText,
    });
  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);

    const errorMessage =
      process.env.NODE_ENV === "development"
        ? error.message
        : "Failed to fetch response from Gemini API. Please try again later.";

    return res.status(500).json({ error: errorMessage });
  }
});

module.exports = geminiRoute;
