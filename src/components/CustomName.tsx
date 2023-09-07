"use client";
import React, { useState, useEffect } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function CustomName() {
  const [text, setText] = useState("WISNU WICAKSONO");
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  const handleMouseOver = () => {
    let iteration = 0;

    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    const newIntervalId = setInterval(() => {
      setText((prevText) =>
        prevText
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return text[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(newIntervalId);
      }

      iteration += 1 / 3;
    }, 30);

    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    const h1Element = document.querySelector("h1");
    h1Element?.addEventListener("mouseover", handleMouseOver);

    return () => {
      h1Element?.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <h1 className="text-white md:text-6xl sm:text-4xl text-xl font-medium">
      {text}
    </h1>
  );
}
