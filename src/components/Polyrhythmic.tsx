// Thanks to https://www.youtube.com/@Hyperplexed

"use client";
import useSound from "use-sound";
import { useRef, useEffect, useState, useCallback } from "react";

import { BsMusicNote } from "react-icons/bs";

import { cn } from "@/lib/utils";

export default function Polyrythmic() {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const paper = useRef<HTMLCanvasElement>(null);
  const startTime = new Date().getTime();

  const calculateNextImpactTime = (
    currentImpactTime: number,
    velocity: number
  ) => {
    return currentImpactTime + (Math.PI / velocity) * 1000;
  };

  const arcs = Array.from(Array(20)).map((_, index) => {
    const audio = `/notes/vibraphone-key-${index}.wav`;
    const [playAudio] = useSound(audio, {
      volume: 0.02,
    });

    const oneFullLoop = 2 * Math.PI;
    const numberOfLoops = 50 - index;
    const velocity = (oneFullLoop * numberOfLoops) / 900;

    return {
      color: `rgba(30, 45, 61, ${1 - index * 0.05})`,
      playAudio,
      velocity,
      nextImpactTime: calculateNextImpactTime(startTime, velocity),
    };
  });

  const draw = useCallback(() => {
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

    pen.strokeStyle = arcs[0].color;
    pen.lineWidth = 1;

    const center = {
      x: paper.current.width * 0.5,
      y: paper.current.height * 0.925,
    };

    const length = end.x - start.x,
      initialArcRadius = length * 0.05;

    const spacing = (length / 2 - initialArcRadius) / arcs.length;

    arcs.forEach((arc, index) => {
      const arcRadius = initialArcRadius + spacing * index;

      // ARC
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
      pen.fillStyle = arc.color;
      pen.beginPath();
      pen.arc(x, y, length * 0.0025, 0, 2 * Math.PI);
      pen.fill();

      if (currentTime >= arc.nextImpactTime) {
        if (audioEnabled) {
          arc.playAudio();
        }
        arc.nextImpactTime = calculateNextImpactTime(
          arc.nextImpactTime,
          arc.velocity
        );
      }
    });

    requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    draw();
    document.onvisibilitychange = () => setAudioEnabled(!audioEnabled);
  }, [audioEnabled]);

  return (
    <>
      <canvas
        ref={paper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-screen h-screen"
      />
      <button
        onClick={() => {
          setAudioEnabled(!audioEnabled);
          arcs[0].playAudio();
        }}
        // onClick={() => setAudioEnabled(!audioEnabled)}
        className={cn(
          "absolute bottom-10",
          audioEnabled ? "text-white" : "text-lines"
        )}
      >
        <BsMusicNote size={32} />
      </button>
    </>
  );
}
