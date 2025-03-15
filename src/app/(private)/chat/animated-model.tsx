"use client";

import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Group, Box3, Vector3, AnimationClip } from "three";
import { useFrame, useThree } from "@react-three/fiber";

type GLTFResult = {
    scene: Group;
    animations: AnimationClip[];
};

interface AnimatedModelProps {
    animationName: string;
    rotationY: number;
}

export default function AnimatedModel({ animationName, rotationY }: AnimatedModelProps) {
    const modelRef = useRef<Group>(null);
    // const canvasRef = useRef<HTMLDivElement | null>(null);

    const { scene, animations } = useGLTF("/models/character.glb") as GLTFResult;
    const { actions } = useAnimations(animations, modelRef);
    const { camera } = useThree();

    const targetAnimation = useRef("");
    const currentAnimation = useRef("");
    const readyTimeout = useRef<NodeJS.Timeout | null>(null);

    // const mousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {


        // const handleMouseMove = (event: MouseEvent) => {
        //     if (!canvasRef.current) return;

        //     const rect = canvasRef.current.getBoundingClientRect(); // Get canvas position
        //     const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        //     const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        //     mousePos.current = { x, y };
        // };

        // window.addEventListener("mousemove", handleMouseMove);
        // return () => window.removeEventListener("mousemove", handleMouseMove);

        if (currentAnimation.current) return;
        targetAnimation.current = "Wave";
        updateAnimation();

    }, []);

    useFrame(() => {
        // if (modelRef.current) {
        //     const targetX = mousePos.current.x * Math.PI * 0.2; // Control rotation sensitivity
        //     modelRef.current.rotation.set(0, targetX, 0);
        // }
        if (modelRef.current) {
            modelRef.current.rotation.y = rotationY;
        }
    });

    useEffect(() => {
        targetAnimation.current = animationName;
        if (readyTimeout.current != null) return;
        updateAnimation();

    }, [animationName]);

    const updateAnimation = () => {
        if (currentAnimation.current == targetAnimation.current) {
            readyTimeout.current = null;
        } else {
            currentAnimation.current = targetAnimation.current;
            transition();
            let delay = targetAnimation.current == "Wave" ? 3000 : 1000;
            readyTimeout.current = setTimeout(() => { updateAnimation(); }, delay);
        }
    }

    const transition = () => {
        if (actions) {
            Object.values(actions).forEach((action) => {
                if (action != null) action.fadeOut(0.5);
            });

            if (actions[currentAnimation.current]) {
                actions[currentAnimation.current].reset().fadeIn(0.5).play();
            }
        }
    }

    useEffect(() => {
        transition();
    }, [actions]);

    useEffect(() => {
        if (modelRef.current) {
            const box = new Box3().setFromObject(modelRef.current);
            const center = box.getCenter(new Vector3());

            camera.position.set(center.x, center.y + 0.5, center.z + 2.5);
            center.y += 0.25;
            camera.lookAt(center);
        }
    }, [camera]);

    return <primitive ref={modelRef} object={scene} scale={1} />;
}
