import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/chat_contact.css";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const beautifyResponse = (responseText) => {
    const points = responseText
      .split("\n\n")
      .map((paragraph) => {
        const parts = paragraph.split(":");
        if (parts.length === 2) {
          return `<li><strong>${parts[0]}</strong>: <em>${parts[1]}</em></li>`;
        }
        return `<li>${paragraph}</li>`;
      })
      .join("");

    return `<ul>${points}</ul>`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt) {
      toast.error("Please enter a prompt to continue.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("api/chat/get-response", { prompt });

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
      <h2>Chat with Us</h2>

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
        <div
          className="response"
          dangerouslySetInnerHTML={{ __html: response }}
        />
      )}
    </div>
  );
};

export default Chat;
