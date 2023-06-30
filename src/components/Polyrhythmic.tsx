"use client";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Polyrythmic() {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const paper = useRef<HTMLCanvasElement>(null);
  const startTime = new Date().getTime();
  const calculateNextImpactTime = (
    currentImpactTime: number,
    velocity: number
  ) => {
    return currentImpactTime + (Math.PI / velocity) * 1000;
  };

  const arcs = [
    "#D0E7F5",
    "#D9E7F4",
    "#D6E3F4",
    "#BCDFF5",
    "#B7D9F4",
    "#C3D4F0",
    "#9DC1F3",
    "#9AA9F4",
    "#8D83EF",
    "#AE69F0",
    "#D46FF1",
    "#DB5AE7",
    "#D911DA",
    "#D601CB",
    "#E713BF",
    "#F24CAE",
    "#FB79AB",
    "#FFB6C1",
    "#FED2CF",
    "#FDDFD5",
    "#FEDCD1",
  ].map((color, index) => {
    const audio = new Audio(`/notes/vibraphone-key-${index}.wav`);
    audio.volume = 0.02;

    const oneFullLoop = 2 * Math.PI,
      numberOfLoops = 50 - index,
      velocity = (oneFullLoop * numberOfLoops) / 900;

    return {
      color,
      audio,
      velocity,
      nextImpactTime: calculateNextImpactTime(startTime, velocity),
    };
  });

  const draw = () => {
    const pen = paper.current?.getContext("2d");
    if (!pen || !paper.current) return;

    const currentTime = new Date().getTime(),
      elapsedTime = (currentTime - startTime) / 1000;

    paper.current.width = paper.current?.clientWidth;
    paper.current.height = paper.current?.clientHeight;

    const start = {
      x: paper.current.width * 0.1,
      y: paper.current.height * 0.9,
    };

    const end = {
      x: paper.current.width * 0.9,
      y: paper.current.height * 0.9,
    };

    pen.strokeStyle = "white";
    pen.lineWidth = 6;

    pen.beginPath();
    pen.moveTo(start.x, start.y);
    pen.lineTo(end.x, end.y);
    pen.stroke();

    const center = {
      x: paper.current.width * 0.5,
      y: paper.current.height * 0.9,
    };

    const length = end.x - start.x,
      initialArcRadius = length * 0.05;

    const spacing = (length / 2 - initialArcRadius) / arcs.length;

    arcs.forEach((arc, index) => {
      const arcRadius = initialArcRadius + spacing * index;

      pen.beginPath();
      pen.strokeStyle = arc.color;
      pen.arc(center.x, center.y, arcRadius, Math.PI, 2 * Math.PI);
      pen.stroke();

      const oneFullLoop = 2 * Math.PI,
        numberOfLoops = 50 - index,
        velocity = (oneFullLoop * numberOfLoops) / 900,
        maxAngle = 2 * Math.PI,
        distance = Math.PI + elapsedTime * velocity,
        modDistance = distance % maxAngle,
        adjustedDistance =
          modDistance >= Math.PI ? modDistance : maxAngle - modDistance;

      const x = center.x + arcRadius * Math.cos(adjustedDistance);
      const y = center.y + arcRadius * Math.sin(adjustedDistance);

      // CIRCLE
      pen.fillStyle = "white";
      pen.beginPath();
      pen.arc(x, y, length * 0.0065, 0, 2 * Math.PI);
      pen.fill();

      if (currentTime >= arc.nextImpactTime) {
        if (audioEnabled) {
          arc.audio.play();
        }
        arc.nextImpactTime = calculateNextImpactTime(
          arc.nextImpactTime,
          arc.velocity
        );
      }
    });

    requestAnimationFrame(draw);
  };

  useEffect(() => {
    draw();
  }, []);

  return (
    <>
      <canvas
        ref={paper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-screen h-screen"
      />
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className={cn(
          "absolute bottom-0",
          audioEnabled ? "text-white" : "line-through"
        )}
      >
        Audio
      </button>
    </>
  );
}
