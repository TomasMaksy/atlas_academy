"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import AnimatedModel from "./animated-model";
import { Vector3 } from "three";

interface CharacterProps {
  chatState: string;
}

export default function Character({ chatState }: CharacterProps) {
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
    <div className="">
      {/* Animation Buttons */}
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {["Idle", "Wave", "Think", "Text"].map((anim) => (
                    <button
                        key={anim}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${animation === anim
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-300 text-black hover:bg-gray-400"
                            }`}
                        onClick={() => setAnimation(anim)}
                    >
                        {anim}
                    </button>
                ))}
            </div> */}

      {/* Transparent 3D Scene */}
      <Canvas
        ref={canvasRef}
        className=" aspect-square"
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 35 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-2.5, 2.5, -5]} intensity={10} />
        <AnimatedModel animationName={animation} rotation={rotation} />

        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
