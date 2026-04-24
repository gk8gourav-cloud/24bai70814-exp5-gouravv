import { useState, useEffect } from "react";

const MAX_LIMIT = 200;

export default function CharacterCounter() {
  const [text, setText] = useState("");

  // Counts
  const charCount = text.length;
  const wordCount =
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  // Warning logic
  let warning = "";
  if (charCount > MAX_LIMIT) {
    warning = "❌ Character limit exceeded!";
  } else if (charCount > MAX_LIMIT * 0.8) {
    warning = "⚠️ Approaching limit...";
  }

  // Save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("draft");
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("draft", text);
  }, [text]);

  // Handle typing
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Reset
  const handleReset = () => {
    setText("");
    localStorage.removeItem("draft");
  };

  // Progress %
  const progress = Math.min((charCount / MAX_LIMIT) * 100, 100);

  return (
    <div className="container">
      <h1>Live Character Counter</h1>

      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing..."
      />

      <div className="info">
        <p>Characters: {charCount}</p>
        <p>Words: {wordCount}</p>
        <p>
          Limit: {MAX_LIMIT} (Remaining: {MAX_LIMIT - charCount})
        </p>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className={`progress ${charCount > MAX_LIMIT ? "danger" : ""}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Warning */}
      {warning && <p className="warning">{warning}</p>}

      {/* Buttons */}
      <button onClick={handleReset}>Clear</button>
    </div>
  );
}
