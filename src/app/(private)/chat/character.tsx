"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import AnimatedModel from "./animated-model";

interface CharacterProps {
    chatState: any;
}

export default function Character({ chatState }: CharacterProps) {
    const [animation, setAnimation] = useState("");

    useEffect(() => {
        if (chatState == "submitted") setAnimation("Think");
        else if (chatState == "streaming") setAnimation("Text");
        else setAnimation("Idle");
    }, [chatState]);

    return (
        <div className="">
            {/* Animation Buttons */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
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
            </div>

            {/* Transparent 3D Scene */}
            <Canvas className=" aspect-square" gl={{ antialias: true, alpha: true }} camera={{ fov: 30 }}>
                <ambientLight intensity={1} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <directionalLight position={[-2.5, 2.5, -5]} intensity={10} />
                <AnimatedModel animationName={animation} />

                {/* <OrbitControls /> */}
            </Canvas>
        </div>
    );
}
