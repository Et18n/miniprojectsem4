"use client";
import Nav from "./components/Nav";
import React, { useEffect, useState } from "react";
import "@/app/components/Styles.css";
export default function Home() {
  const [result, setResult] = useState("");
  const [text, setText] = useState("");

  function fetchData() {
    // console.log(JSON.stringify({ text_analyze: text }));
    const idk = fetch("http://localhost:8080/process", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text_analyze: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResult(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div id="Home">
      <Nav />

      <textarea
        id="input_text"
        name="text_analyze"
        onChange={(e) => setText(e.target.value)}
      />
      <button id="analyse" onClick={fetchData}>
        Analyse text
      </button>
      <div id="result">{result}</div>
    </div>
  );
}
