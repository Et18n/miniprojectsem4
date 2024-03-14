"use client";
import Nav from "./components/Nav";
import React, { useEffect, useState } from "react";
import "@/app/components/Styles.css";
export default function Home() {
  async function trun() {
    const res = await fetch("http://127.0.0.1:8080/process");
    console.log(res);
  }

  const [result, setResult] = useState("Loading");
  const [text, setText] = useState("");

  async function fetchData() {
    console.log(JSON.stringify({ text_analyze: text }));
    const response = await fetch("http://localhost:8080/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text_analyze: text }),
    });
    console.log(response);
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
      <div>{result}</div>
    </div>
  );
}