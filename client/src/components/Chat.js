import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import '../styles/chat.css'

const Chat = () => {
  const [prompt, setPrompt] = useState(""); 
  const [response, setResponse] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt) {
      toast.error("Please enter a prompt to continue.");
      return;
    }

    setLoading(true); 

    try {
      const { data } = await axios.post("/api/chat/get-response", { prompt });

      setResponse(data.answer);
      setLoading(false); 

    } catch (error) {
      setLoading(false); 
      toast.error("Failed to get response from ChatGPT.");
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with ChatGPT</h2>

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
        <div className="response">
          <h3>ChatGPT's Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
