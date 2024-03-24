"use client";
import Nav from "./components/Nav";
import React, { useState } from "react";

export default function Home() {
  let [result, setResult] = useState("No");
  const [text, setText] = useState(
    "THIS IS A TEST SCRIPT: IF NOT RUN RETURN THIS VALUE"
  );

  async function fetchData() {
    console.log(JSON.stringify({ text_analyze: text }));
    const idk = await fetch("http://127.0.0.1:8080/process", {
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
      <div id="result">No</div>
    </div>
  );
}
