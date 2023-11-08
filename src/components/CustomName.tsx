"use client";
import React, { useState, useEffect, useRef } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function CustomName() {
  const [text, setText] = useState("WISNU WICAKSONO");
  const [intervalId] = useState<NodeJS.Timer | null>(null);
  const ref = useRef<HTMLHeadingElement | null>(null);

  const handleMouseOver = () => {
    let iteration = 0;

    if (intervalId !== null) {
      clearTimeout(intervalId);
    }

    const animate = () => {
      setText((prevText) =>
        prevText
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join(""),
      );

      if (iteration < text.length) {
        iteration += 1 / 3;
        setTimeout(animate, 30);
      }
    };

    animate();
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, []);

  return (
    <h1
      ref={ref}
      className="text-white md:text-6xl sm:text-4xl text-xl font-medium"
    >
      {text}
    </h1>
  );
}
