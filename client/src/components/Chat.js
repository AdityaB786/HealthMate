import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import '../styles/chat.css';

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const beautifyResponse = (responseText) => {
    // Beautifying the response by adding bullet points and formatting
    const points = responseText
      .split("\n\n") // Split response into paragraphs
      .map((paragraph) => {
        // Add some basic formatting (bold and italics) within the text
        const parts = paragraph.split(":");
        if (parts.length === 2) {
          // Bold for title and italicize the content after ":"
          return `<li><strong>${parts[0]}</strong>: <em>${parts[1]}</em></li>`;
        }
        return `<li>${paragraph}</li>`; // If no colon, just treat as a normal paragraph
      })
      .join("");

    return `<ul>${points}</ul>`; // Create a bullet list
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt) {
      toast.error("Please enter a prompt to continue.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("/chat/get-response", { prompt });

      if (data && data.answer) {
        const generatedText = data.answer || "No response generated.";
        const beautifiedResponse = beautifyResponse(generatedText);
        setResponse(beautifiedResponse);
      } else {
        setResponse("No response generated.");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching from backend:", error);
      toast.error("Failed to get response from Gemini.");
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with Gemini</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handleChange}
          placeholder="Enter your symptoms or question here"
          rows="5"
          cols="50"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Response"}
        </button>
      </form>

      {response && (
        <div className="response" dangerouslySetInnerHTML={{ __html: response }} />
      )}
    </div>
  );
};

export default Chat;
