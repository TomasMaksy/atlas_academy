"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import AnimatedModel from "../chat/animated-model";

interface CharacterProps {
  chatState: string;
}

export default function CharacterCall({ chatState }: CharacterProps) {
  const [animation, setAnimation] = useState("");
  const [rotation, setRotation] = useState(new Vector3());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.width) * 2 - 1;

      const rx = Math.PI * 0.5 - Math.atan2(30, y);
      const ry = Math.PI * 0.5 - Math.atan2(15, x);

      setRotation(new Vector3(rx, ry));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (chatState == "submitted") setAnimation("Think");
    else if (chatState == "streaming") setAnimation("Text");
    else setAnimation("Idle");
  }, [chatState]);

  return (
    <Canvas
      ref={canvasRef}
      className=" aspect-square"
      gl={{ antialias: true, alpha: true }}
      // camera={{ fov: 35 }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-2.5, 2.5, -5]} intensity={10} />
      <AnimatedModel animationName={animation} rotation={rotation} />

      {/* <OrbitControls /> */}
    </Canvas>
  );
}
